import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class CreateScheduleDto {
  title: string;
  location: string;
  location_detail: string;
  @ApiProperty({
    type: `integer`,
    format: `int32`,
  })
  min_attend?: number;
}
