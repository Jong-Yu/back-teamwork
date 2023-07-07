import { ApiProperty } from '@nestjs/swagger';

export class NoticeDto {
  id: string;
  title: string;
  @ApiProperty({
    type: `string`,
    format: `date-time`,
  })
  registed_date: Date;
}
