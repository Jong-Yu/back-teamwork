import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from '../generated/nestjs-dto/user/dto/create-user.dto';
import { PrismaClient } from '@prisma/client';
import { UserDto } from 'src/generated/nestjs-dto/user/dto/user.dto';
import { UpdateUserDto } from 'src/generated/nestjs-dto/user/dto/update-user.dto';

@Injectable()
export class UserService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async findAll() {
    return await this.user.findMany();
  }

  async findManyByIds(ids: number[]) {
    return await this.user.findMany({ where: { id: { in: ids } } });
  }

  async findManyByDto(userDto: UserDto) {
    return await this.user.findMany({ where: userDto });
  }

  async findOne(id: number) {
    return await this.user.findUnique({ where: { id } });
  }

  async findOneByEmail(email: string) {
    return await this.user.findUnique({ where: { email } });
  }

  async create(createUserDto: CreateUserDto) {
    return await this.user.create({
      data: createUserDto,
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.user.update({ data: updateUserDto, where: { id } });
  }

  async remove(id: number) {
    return await this.user.delete({ where: { id } });
  }
}
