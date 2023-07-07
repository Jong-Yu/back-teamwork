import { ApiProperty } from '@nestjs/swagger';

export class ScheduleDto {
  id: string;
  title: string;
  @ApiProperty({
    type: `string`,
    format: `date-time`,
  })
  date: Date;
  location: string;
  location_detail: string;
  @ApiProperty({
    type: `integer`,
    format: `int32`,
  })
  min_attend: number | null;
  @ApiProperty({
    type: `string`,
    format: `date-time`,
  })
  registred_date: Date;
}
