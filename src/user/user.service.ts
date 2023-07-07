import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../generated/nestjs-dto/user/dto/create-user.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UserService {
  // async onModuleInit() {
  //   await this.$connect();
  // }
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({
      data: { ...createUserDto },
    });
  }
}
