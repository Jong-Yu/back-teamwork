import { IsString } from 'class-validator';

export class ReFreshTokenDto {
  @IsString()
  email: string;

  @IsString()
  kakaoToken: string;
}
