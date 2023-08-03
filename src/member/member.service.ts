import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateMemberDto } from '../_model/member/dto/create-member.dto';
import { UpdateMemberDto } from '../_model/member/dto/update-member.dto';

@Injectable()
export class MemberService {
  constructor(private prisma: PrismaService) {}

  async find() {
    await this.prisma.member.findMany();
  }

  async create(createMemberDto: CreateMemberDto) {
    await this.prisma.member.create({
      data: createMemberDto,
    });
  }

  async update(memberId: string, updateMemberDto: UpdateMemberDto) {
    await this.prisma.member.update({
      data: {
        ...updateMemberDto,
      },
      where: {
        id: memberId,
      },
    });
  }
}
