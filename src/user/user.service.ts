import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserRepository } from '../repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async create(userDto: CreateUserDto) {
    this.userRepository.insert(userDto);
  }
}
