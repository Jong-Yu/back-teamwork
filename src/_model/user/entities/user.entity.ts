import { Member } from '@prisma/client';
import { IsDate, IsObject, IsOptional, IsString } from 'class-validator';

export class User {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  email: string | null;

  @IsString()
  @IsOptional()
  phone: string | null;

  @IsDate()
  sign_date: Date;

  @IsString()
  @IsOptional()
  refreshToken: string | null;

  @IsObject()
  @IsOptional()
  Member?: Member[];
}
