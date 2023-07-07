import { Team, Member, Voting } from '@prisma/client';
import { IsDate, IsInt, IsObject, IsOptional, IsString } from 'class-validator';

export class Schedule {
  @IsString()
  id: string;

  @IsString()
  team_id: string;

  @IsString()
  member_id: string;

  @IsString()
  title: string;

  @IsDate()
  date: Date;

  @IsString()
  location: string;

  @IsString()
  location_detail: string;

  @IsInt()
  @IsOptional()
  min_attend: number | null;

  @IsDate()
  registred_date: Date;

  @IsObject()
  @IsOptional()
  Team?: Team;

  @IsObject()
  @IsOptional()
  Member?: Member;

  @IsObject()
  @IsOptional()
  Voting?: Voting[];
}
