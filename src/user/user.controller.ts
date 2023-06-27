import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../generated/nestjs-dto/user/dto/create-user.dto';
import { UserService } from './user.service';
import { UserDto } from 'src/generated/nestjs-dto/user/dto/user.dto';
import { UpdateUserDto } from 'src/generated/nestjs-dto/user/dto/update-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  // `constructor`를 사용하여 `UserService` 클래스를 가져와 사용합니다
  // 필수! controller에 service를 주입하기 위해서는 user.module.ts에 controller와 service가 정의되어야 합니다
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.findAll();
  }

  @Post()
  getUserByIds(@Body() ids: number[]) {
    return this.userService.findManyByIds(ids);
  }

  @Post('search')
  getUserByQuery(@Body() query: UserDto) {
    return this.userService.findManyByDto(query);
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get('email/:email')
  getUserByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }

  @Post('create')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put('update/:id')
  updateUser(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete('delete/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
