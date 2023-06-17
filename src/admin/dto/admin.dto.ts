import { IsInt, IsString } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;
}
