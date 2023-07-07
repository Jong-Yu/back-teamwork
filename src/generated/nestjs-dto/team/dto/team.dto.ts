import { IsDate, IsOptional, IsString } from 'class-validator';

export class TeamDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  logo: string | null;

  @IsDate()
  registered_date: Date;
}
