import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../generated/nestjs-dto/user/dto/create-user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  // `constructor`를 사용하여 `UserService` 클래스를 가져와 사용합니다
  // 필수! controller에 service를 주입하기 위해서는 user.module.ts에 controller와 service가 정의되어야 합니다
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return 'All users';
  }

  @Get(':id')
  getUserInfo(@Param('id') id: string) {
    return 'User info for user with id: ' + id;
  }

  @Get('search')
  getUserByEmail(@Query('email') email: string) {
    return 'User with email: ' + email;
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return 'Delete user with id: ' + id;
  }

  @Get(':id/addresses')
  getUserAddresses(@Param('id') id: string) {
    return 'Addresses for user with id: ' + id;
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  createUser(@Body() userDto: CreateUserDto) {
    return this.userService.insertUser(userDto);
  }
}
