import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { JwtKakaoStrategy } from './strategy/jwt-social-kakao.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtKakaoStrategy],
})
export class AuthModule {}
