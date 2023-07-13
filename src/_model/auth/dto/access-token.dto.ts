import { IsOptional, IsString } from 'class-validator';

export class AccessTokenDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  kakaoToken: string;
}
