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
  phone: string;

  @IsDate()
  sign_date: Date;

  @IsObject()
  @IsOptional()
  Member?: Member[];
}
