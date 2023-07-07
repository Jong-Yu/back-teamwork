import { Member_status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class MemberDto {
  id: string;
  duty: string;
  @ApiProperty({
    enum: Member_status,
  })
  status: Member_status;
  @ApiProperty({
    type: `string`,
    format: `date-time`,
  })
  status_date: Date;
}
