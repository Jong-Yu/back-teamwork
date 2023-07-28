import { IsDate, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  email: string | null;

  @IsString()
  @IsOptional()
  phone?: string | null;

  @IsDate()
  sign_date: Date;
}
