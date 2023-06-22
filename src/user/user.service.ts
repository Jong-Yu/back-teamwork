import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from '../generated/nestjs-dto/user/dto/create-user.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async insertUser(userDto: CreateUserDto) {
    return this.user.create({ data: userDto });
  }
}
