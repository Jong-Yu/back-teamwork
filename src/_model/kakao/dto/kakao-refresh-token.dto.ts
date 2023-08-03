import { IsNumber, IsOptional, IsString } from 'class-validator';

export class KakaoRefreshTokenDto {
  @IsString()
  access_token: string;

  @IsString()
  token_type: string;

  @IsString()
  @IsOptional()
  refresh_token?: string;

  @IsNumber()
  @IsOptional()
  refresh_token_expires_in?: number;

  @IsNumber()
  expires_in: number;
}
