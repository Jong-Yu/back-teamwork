import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';

export class ScheduleDto {
  @IsString()
  id: string;

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
}
