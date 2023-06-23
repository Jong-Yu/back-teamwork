import { IsOptional, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @IsOptional()
  id: number;

  @IsString()
  @IsOptional()
  name: string | null;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  phone: string | null;

  @IsString()
  @IsOptional()
  age: number;
}
