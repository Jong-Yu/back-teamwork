import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateScheduleDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsDate()
  date: Date;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  location_detail?: string;

  @IsNumber()
  @IsOptional()
  min_attend?: number;
}
