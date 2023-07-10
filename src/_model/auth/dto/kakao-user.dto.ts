import { IsString } from 'class-validator';

export class UserKakaoDto {
  @IsString()
  name: string;

  @IsString()
  kakaoId: string;

  @IsString()
  email: string;
}
