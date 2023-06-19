import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(userDto: CreateUserDto) {
    console.log('userDto', userDto);

    return this.userRepository.insertUser(userDto);
  }
}
