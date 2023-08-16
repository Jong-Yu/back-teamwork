import { Response } from 'express';
import { setCookie, clearCookie } from './cookie.util';
import { describe, it, expect, vi } from 'vitest';

describe('cookie.util', () => {
  describe('setCookie', () => {
    it('주어진 키와 값으로 쿠키를 설정해야 합니다.', () => {
      const res: Response = {
        cookie: vi.fn(),
      } as unknown as Response;

      setCookie(res, 'testKey', 'testValue');

      expect(res.cookie).toHaveBeenCalledWith('testKey', 'testValue');
    });

    it('프로덕션 환경에서는 주어진 키와 값으로 보안 쿠키를 설정해야 합니다.', () => {
      process.env.NODE_ENV = 'production';

      const res: Response = {
        cookie: vi.fn(),
      } as unknown as Response;

      setCookie(res, 'testKey', 'testValue');

      expect(res.cookie).toHaveBeenCalledWith('testKey', 'testValue', {
        domain: 'zeabur.app',
        httpOnly: true,
        path: '/',
        sameSite: 'none',
        secure: true,
      });

      process.env.NODE_ENV = 'test';
    });
  });

  describe('clearCookie', () => {
    it('주어진 키로 쿠키를 삭제해야 합니다.', () => {
      const res: Response = {
        cookies: { testKey: 'testValue' },
        clearCookie: vi.fn(),
      } as unknown as Response;

      clearCookie(res, 'testKey');

      expect(res.clearCookie).toHaveBeenCalledWith('testKey');
    });

    it('프로덕션 환경에서는 주어진 키로 쿠키를 삭제해야 합니다.', () => {
      process.env.NODE_ENV = 'production';

      const res: Response = {
        clearCookie: vi.fn(),
      } as unknown as Response;

      clearCookie(res, 'testKey');

      expect(res.clearCookie).toHaveBeenCalledWith('testKey', {
        domain: 'zeabur.app',
        httpOnly: true,
        path: '/',
      });

      process.env.NODE_ENV = 'test';
    });
  });
});
