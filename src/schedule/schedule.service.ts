import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  async findScheduleById(id: string) {
    return this.prisma.schedule.findMany({
      where: {
        team_id: id,
      },
    });
  }
}
