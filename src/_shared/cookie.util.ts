import { Response } from 'express';

export function setCookie(res: Response, key: string, value: string) {
  res.cookie(key, value, {
    domain: 'zeabur.app',
    httpOnly: true,
    path: '/',
    sameSite: 'none',
    secure: true,
  });
}

export function clearCookie(res: Response, key: string) {
  res.clearCookie(key, {
    domain: 'zeabur.app',
    httpOnly: true,
    path: '/',
  });
}
