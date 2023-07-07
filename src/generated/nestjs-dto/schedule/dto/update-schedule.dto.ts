import { ApiProperty } from '@nestjs/swagger';

export class UpdateScheduleDto {
  title?: string;
  location?: string;
  location_detail?: string;
  @ApiProperty({
    type: `integer`,
    format: `int32`,
  })
  min_attend?: number;
}
