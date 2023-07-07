import { Team, Notice } from '@prisma/client';
import { IsDate, IsObject, IsOptional, IsString } from 'class-validator';

export class Notice {
  @IsString()
  id: string;

  @IsString()
  team_id: string;

  @IsString()
  member_id: string;

  @IsString()
  title: string;

  @IsDate()
  registed_date: Date;

  @IsObject()
  @IsOptional()
  Team?: Team;

  @IsObject()
  @IsOptional()
  Member?: Member;
}
