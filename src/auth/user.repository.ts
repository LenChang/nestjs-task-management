import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { userName, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const user = this.create({ userName, password: hash });

    try {
      await this.save(user);
    } catch (e) {
      if (e.code === '23505')
        throw new ConflictException('UserName already exists');

      throw new InternalServerErrorException();
    }
  }
}
