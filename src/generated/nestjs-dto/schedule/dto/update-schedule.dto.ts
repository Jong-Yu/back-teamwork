import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateScheduleDto {
  @IsString()
  @IsOptional()
  title?: string;

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
