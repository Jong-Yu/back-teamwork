import { Response, Request } from 'express';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../_middleware/AuthGuard';
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
    const isBigin = await this.authService.isValidToken(req);
    return isBigin;
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
      res.cookie('refresh_token', refreshToken);

      // {
      //   httpOnly: true,
      //   sameSite: 'none',
      // }

      return res.send(accessToken);
    } catch (e) {
      res.send(e);
    }
  }

  /**
   * @description 토큰 재발급
   */
  @Post('refresh')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    try {
      const { accessToken, refreshToken } = await this.authService.refreshToken(
        req.cookies['refresh_token'],
      );

      res.cookie('refresh_token', refreshToken);

      // , {
      //   httpOnly: true,
      //   sameSite: 'none',
      // }

      return res.send(accessToken);
    } catch (e) {
      res.status(e.status).send(e);
    }
  }

  /**
   * @description 로그아웃
   */
  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      this.authService.logout(req);
      res.clearCookie('refresh_token');
    } catch {
      res.status(500).send();
    }

    res.send();
  }
}
