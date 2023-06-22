import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../generated/nestjs-dto/user/dto/create-user.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  // constructor(private userRepository: UserRepository) {}

  async insertUser(userDto: CreateUserDto) {
    prisma.user.create({
      data: { ...userDto },
    });
  }
}
