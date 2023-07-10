import { Member_status } from '@prisma/client';
import { IsDate, IsEnum, IsString } from 'class-validator';

export class MemberDto {
  @IsString()
  id: string;

  @IsString()
  duty: string;

  @IsEnum(Member_status)
  status: Member_status;

  @IsDate()
  status_date: Date;
}
