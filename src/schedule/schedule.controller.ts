import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/_middleware/AuthGuard';
import { ScheduleService } from './schedule.service';

@ApiTags('스케줄 API')
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get('findScheduleById')
  @UseGuards(AuthGuard)
  findScheduleById(@Query('teamId') id: string) {
    return this.scheduleService.findScheduleById(id);
  }
}
