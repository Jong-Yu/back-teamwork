import {
  Member_status,
  Team,
  User,
  Notice,
  Schedule,
  Voting,
} from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class Member {
  @IsString()
  id: string;

  @IsString()
  team_id: string;

  @IsString()
  user_id: string;

  @IsString()
  duty: string;

  @IsEnum(Member_status)
  status: Member_status;

  @IsDate()
  status_date: Date;

  @IsObject()
  @IsOptional()
  Team?: Team;

  @IsObject()
  @IsOptional()
  User?: User;

  @IsObject()
  @IsOptional()
  Notice?: Notice[];

  @IsObject()
  @IsOptional()
  Schedule?: Schedule[];

  @IsObject()
  @IsOptional()
  Voting?: Voting[];
}
