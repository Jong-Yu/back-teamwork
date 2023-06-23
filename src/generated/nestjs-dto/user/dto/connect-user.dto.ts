import { IsInt, IsOptional, IsString } from 'class-validator';

export class ConnectUserDto {
  @IsInt()
  @IsOptional()
  id?: number;

  @IsString()
  @IsOptional()
  email?: string;
}
