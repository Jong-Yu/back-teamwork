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
  phone: string;

  @IsDate()
  sign_date: Date;
}
