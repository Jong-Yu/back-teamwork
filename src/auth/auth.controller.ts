import { Response, Request } from 'express';
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { getRefreshTokenInCookie } from '../_shared/util/Request/request.util';
import { clearCookie, setCookie } from '../_shared/util/Cookie/cookie.util';
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

      setCookie(res, 'access_token', accessToken);
      setCookie(res, 'refresh_token', refreshToken);

      res.status(200).send('success');
    } catch (e) {
      console.log(e);
      res.status(e.status).send(e);
    }
  }

  /**
   * @description 토큰 재발급
   */
  @Post('reissueToken')
  async reissueToken(@Req() req: Request, @Res() res: Response) {
    try {
      const { accessToken, refreshToken } = await this.authService.reissueToken(
        getRefreshTokenInCookie(req),
      );

      setCookie(res, 'access_token', accessToken);
      setCookie(res, 'refresh_token', refreshToken);

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

      clearCookie(res, 'access_token');
      clearCookie(res, 'refresh_token');
    } catch (e) {
      console.log(e);
      res.status(500).send();
    }

    res.send('logout success');
  }
}
