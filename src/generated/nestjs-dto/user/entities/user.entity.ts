import { Post } from '../../post/entities/post.entity';
import { Profile } from '../../profile/entities/profile.entity';
import { IsInt, IsObject, IsOptional, IsString } from 'class-validator';

export class User {
  @IsInt()
  id: number;

  @IsString()
  name: string | null;

  @IsString()
  email: string;

  @IsString()
  phone: string | null;

  @IsInt()
  age: number;

  @IsObject()
  @IsOptional()
  Post?: Post[];

  @IsObject()
  @IsOptional()
  Profile?: Profile | null;
}
