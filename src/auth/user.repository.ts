import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { userName, password } = authCredentialsDto;

    const user = this.create({ userName, password });

    try {
      await this.save(user);
    } catch (e) {
      if (e.code === '23505')
        throw new ConflictException('UserName already exists');

      throw new InternalServerErrorException();
    }
  }
}
