import { IsNumber, IsString } from 'class-validator';

export class KakaoTokenDto {
  @IsString()
  access_token: string;

  @IsString()
  token_type: string;

  @IsString()
  refresh_token: string;

  @IsNumber()
  expires_in: number;

  @IsString()
  scope: string;

  @IsNumber()
  refresh_token_expires_in: number;
}
