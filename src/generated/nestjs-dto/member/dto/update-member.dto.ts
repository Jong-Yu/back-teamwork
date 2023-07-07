import { Member_status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMemberDto {
  duty?: string;
  @ApiProperty({
    enum: Member_status,
  })
  status?: Member_status;
}
