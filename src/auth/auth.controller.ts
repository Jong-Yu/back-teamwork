import { Response, Request } from 'express';
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { getRefreshTokenInCookie } from '../_shared/request.util';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * @description 토큰 유효성 검사
   * @returns boolean
   */
  @Get('isvalid')
  async isValid(@Req() req: Request) {
    return await this.authService.isValidToken(req);
  }

  /**
   * @description 카카오 로그인
   */
  @Post('kakao')
  async loginKakao(@Body('code') code: string, @Res() res: Response) {
    try {
      const { accessToken, refreshToken } = await this.authService.getToken(
        code,
      );
      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        domain: 'https://team-work.zeabur.app',
      });

      res.cookie('access_token', accessToken, {
        httpOnly: true,
        domain: 'https://team-work.zeabur.app',
      });

      res.status(200).send('success');
    } catch (e) {
      console.log(e);
      res.status(e.status).send(e);
    }
  }

  /**
   * @description 토큰 재발급
   */
  @Post('refresh')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    try {
      const { accessToken, refreshToken } = await this.authService.refreshToken(
        getRefreshTokenInCookie(req),
      );

      res.cookie('access_token', accessToken, {
        httpOnly: true,
        domain: 'https://team-work.zeabur.app',
      });

      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        domain: 'https://team-work.zeabur.app',
      });

      res.status(200).send('success');
    } catch (e) {
      console.log(e);
      res.status(e.status).send(e);
    }
  }

  /**
   * @description 로그아웃
   */
  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      this.authService.logout(req);
      res.clearCookie('access_token', {
        domain: 'https://team-work.zeabur.app',
      });
      res.clearCookie('refresh_token', {
        domain: 'https://team-work.zeabur.app',
      });
    } catch (e) {
      console.log(e);
      res.status(500).send();
    }

    res.send('logout success');
  }
}
