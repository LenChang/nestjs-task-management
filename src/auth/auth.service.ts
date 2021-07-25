import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}

  signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepo.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<JwtPayload> {
    const { userName, password } = authCredentialsDto;

    const user = await this.userRepo.findOne({ userName });

    if (user && bcrypt.compareSync(password, user.password)) {
      const payload = { userName };
      const accessToken = await this.jwtService.sign(payload);
      return { userName: accessToken };
    }

    throw new UnauthorizedException('Please check your credentials');
  }
}
