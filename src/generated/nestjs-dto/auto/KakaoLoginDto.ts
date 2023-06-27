import { IsOptional, IsString } from 'class-validator';

export class KakaoLoginDto {
  @IsOptional()
  @IsString()
  accessToken?: string;
}
