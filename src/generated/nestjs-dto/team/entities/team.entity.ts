import { Member, Notice, Schedule } from '@prisma/client';
import { IsDate, IsObject, IsOptional, IsString } from 'class-validator';

export class Team {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  logo: string | null;

  @IsDate()
  registered_date: Date;

  @IsObject(Member)
  @IsOptional()
  Member?: Member[];

  @IsObject(Notice)
  @IsOptional()
  Notice?: Notice[];

  @IsObject(Schedule)
  @IsOptional()
  Schedule?: Schedule[];
}
