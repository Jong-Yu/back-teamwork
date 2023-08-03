import { IsOptional, IsString } from 'class-validator';

export class KakaoLoginDto {
  @IsString()
  @IsOptional()
  accessToken?: string;
}
