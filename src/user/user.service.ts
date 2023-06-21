import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../generated/nestjs-dto/user/dto/create-user.dto';

@Injectable()
export class UserService {
  // constructor(private userRepository: UserRepository) {}

  async insertUser(userDto: CreateUserDto) {
    console.log('userDto', userDto);
  }
}
