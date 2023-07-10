import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto } from '../_model/user/dto/create-user.dto';

@ApiTags('유저 API')
@Controller('user')
export class UserController {
  // `constructor`를 사용하여 `UserService` 클래스를 가져와 사용합니다
  // 필수! controller에 service를 주입하기 위해서는 user.module.ts에 controller와 service가 정의되어야 합니다
  constructor(private readonly userService: UserService) {}

  @Post('create')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
