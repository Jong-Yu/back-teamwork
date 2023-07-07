import {
  IsBoolean,
  IsDate,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class Voting {
  @IsString()
  id: string;

  @IsString()
  schedule_id: string;

  @IsString()
  member_id: string;

  @IsBoolean()
  voting: boolean;

  @IsDate()
  voting_date: Date;

  @IsObject()
  @IsOptional()
  Schedule?: Schedule;

  @IsObject()
  @IsOptional()
  Member?: Member;
}
