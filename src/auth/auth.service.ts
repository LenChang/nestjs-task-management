import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
  ) {}

  signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepo.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { userName, password } = authCredentialsDto;

    const user = await this.userRepo.findOne({ userName });

    if (user && bcrypt.compareSync(password, user.password)) return 'success';

    throw new UnauthorizedException('Please check your credentials');
  }
}
