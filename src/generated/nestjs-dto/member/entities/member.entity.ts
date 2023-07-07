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

  @IsObject(Team)
  @IsOptional()
  Team?: Team;

  @IsObject(User)
  @IsOptional()
  User?: User;

  @IsObject(Notice)
  @IsOptional()
  Notice?: Notice[];

  @IsObject(Schedule)
  @IsOptional()
  Schedule?: Schedule[];

  @IsObject(Voting)
  @IsOptional()
  Voting?: Voting[];
}
