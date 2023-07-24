import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateScheduleDto {
  @IsString()
  title: string;

  @IsDate()
  date: Date;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;

  @IsString()
  location: string;

  @IsString()
  location_detail: string;

  @IsNumber()
  @IsOptional()
  min_attend?: number;
}
