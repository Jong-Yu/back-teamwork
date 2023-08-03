import { IsNumber } from 'class-validator';

export class KakaoVerifyDto {
  @IsNumber()
  id: number;

  @IsNumber()
  expires_in: number;

  @IsNumber()
  app_id: number;
}
