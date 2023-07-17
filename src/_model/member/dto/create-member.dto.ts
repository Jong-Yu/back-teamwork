import { Member_status } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  duty: string;

  @IsEnum(Member_status)
  status: Member_status;

  @IsString()
  team_id: string;

  @IsString()
  user_id: string;
}
