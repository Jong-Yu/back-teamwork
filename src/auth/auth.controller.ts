import { Controller, Get, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { KaKaoStrategyResponse } from './strategy/Kakao.strategy';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async loginKakao() {
    // passport-kakao가 자동으로 실행
  }

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  @Redirect('http://localhost:5173/auth/kakao/callback')
  async kakaoCallback(@Req() req: Request) {
    const user = req.user as KaKaoStrategyResponse;

    return user;
  }
}
