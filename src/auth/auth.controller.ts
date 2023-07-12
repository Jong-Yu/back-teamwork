import { Response, Request } from 'express';
import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../_middleware/AuthGuard';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@Body('access_token') accessToken: string): Promise<void> {
    this.authService.logout(accessToken);
  }
}
