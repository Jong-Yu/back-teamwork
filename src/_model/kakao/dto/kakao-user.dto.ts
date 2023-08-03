import { IsString } from 'class-validator';

export class KakaoUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;
}
