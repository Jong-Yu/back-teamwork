import { Response } from 'express';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('kakao')
  async loginKakao(@Body('code') code: string, @Res() res: Response) {
    try {
      const { access_token, refreshToken } = await this.authService.getToken(
        code,
      );
      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
      });

      return res.send(access_token);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  }

  @Post('logout')
  async logout(@Body('access_token') access_token: string): Promise<void> {
    this.authService.logout(access_token);
  }
}
