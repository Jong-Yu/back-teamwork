import { Response } from 'express';

export function setCookie(res: Response, key: string, value: string) {
  if (process.env.NODE_ENV === 'development') {
    res.cookie(key, value);
  } else {
    res.cookie(key, value, {
      domain: 'zeabur.app',
      httpOnly: true,
      path: '/',
      sameSite: 'none',
      secure: true,
    });
  }
}

export function clearCookie(res: Response, key: string) {
  if (process.env.NODE_ENV === 'development') {
    res.clearCookie(key);
  } else {
    res.clearCookie(key, {
      domain: 'zeabur.app',
      httpOnly: true,
      path: '/',
    });
  }
}
