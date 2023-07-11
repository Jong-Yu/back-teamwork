import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('kakao')
  async loginKakao(@Body('code') code: string) {
    const token = await this.authService.getToken(code);
    return token;
  }

  @Post('logout')
  async logout(@Body('access_token') access_token: string): Promise<void> {
    this.authService.logout(access_token);
  }
}
