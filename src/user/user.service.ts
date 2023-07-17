import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from '../_model/user/dto/create-user.dto';
import { UpdateUserDto } from '../_model/user/dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({
      data: createUserDto,
    });
  }

  async update(email: string, UpdateUserDto: UpdateUserDto) {
    await this.prisma.user.update({
      data: {
        ...UpdateUserDto,
      },
      where: {
        email,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
