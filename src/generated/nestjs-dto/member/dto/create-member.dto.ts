import { Member_status } from '@prisma/client';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class CreateMemberDto {
  duty: string;
  @ApiProperty({
    enum: Member_status,
  })
  status: Member_status;
}
