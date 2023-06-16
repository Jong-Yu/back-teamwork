import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  create(userDto: CreateUserDto) {
    return userDto;
  }
}
