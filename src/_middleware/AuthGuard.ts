import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getTokenInRequest } from '../_shared/request.util';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(contest: ExecutionContext): Promise<boolean> {
    const request = contest.switchToHttp().getRequest();
    const accessToken = getTokenInRequest(request);

    // access_token이 없다면 401 에러
    if (!accessToken) {
      throw new UnauthorizedException('access token expired');
    }

    try {
      // access_token 검증
      const accessPayload = await this.jwtService.verifyAsync(accessToken, {
        secret: process.env.JWT_SECRET,
      });

      request['user'] = accessPayload;
    } catch (e) {
      throw new UnauthorizedException('access token expired');
    }

    return true;
  }
}
