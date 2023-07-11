import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from '../_model/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/_model/user/dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    await this.prisma.user.create({
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

  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
