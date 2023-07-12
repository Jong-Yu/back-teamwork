import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(contest: ExecutionContext): Promise<boolean> {
    const request = contest.switchToHttp().getRequest();
    const access_token = this.extractTokenFromHeader(request);

    // access_token이 없다면 401 에러
    if (!access_token) {
      throw new UnauthorizedException();
    }

    try {
      // access_token 검증
      const accessPayload = await this.jwtService.verifyAsync(access_token, {
        secret: process.env.JWT_SECRET,
      });

      request['user'] = accessPayload;
    } catch (e) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
