import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateScheduleDto {
  @IsString()
  title: string;

  @IsString()
  location: string;

  @IsString()
  location_detail: string;

  @IsNumber()
  @IsOptional()
  min_attend?: number;
}
