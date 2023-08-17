import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { verify } from '../_shared/util/Kakao/kakao.util';
import { getAccessTokenInCookie } from '../_shared/util/Request/request.util';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(contest: ExecutionContext): Promise<boolean> {
    if (process.env.NODE_ENV === 'test') return true;

    const request = contest.switchToHttp().getRequest();
    const accessToken = getAccessTokenInCookie(request);

    // access_token이 없다면 401 에러
    if (!accessToken) {
      throw new UnauthorizedException('access token expired');
    }

    try {
      // access_token 검증
      await verify(accessToken);
    } catch (e) {
      throw new UnauthorizedException('access token expired');
    }

    return true;
  }
}
