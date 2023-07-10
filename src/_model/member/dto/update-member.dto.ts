import { Member_status } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class UpdateMemberDto {
  @IsString()
  duty?: string;

  @IsEnum(Member_status)
  status?: Member_status;
}
