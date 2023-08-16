import { Request } from 'express';

export function getAccessTokenInCookie(request: Request): string | undefined {
  return request.cookies['access_token'];
}

export function getRefreshTokenInCookie(request: Request): string | undefined {
  return request.cookies['refresh_token'];
}
