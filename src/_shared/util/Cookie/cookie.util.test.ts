import { Response } from 'express';
import { setCookie, clearCookie } from './cookie.util';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('cookie.util', () => {
  let mockRes: Partial<Response>;

  // 각 테스트 케이스 실행 전에 항상 실행되는 부분
  beforeEach(() => {
    process.env.NODE_ENV = 'test';

    // Response의 메서드들을 mock 함수로 초기화
    mockRes = {
      cookie: vi.fn(),
      clearCookie: vi.fn(),
    };
  });

  describe('setCookie', () => {
    it('개발 환경에서 주어진 키와 값으로 쿠키를 설정', () => {
      process.env.NODE_ENV = 'development';

      setCookie(mockRes as Response, 'testKey', 'testValue');
      expect(mockRes.cookie).toHaveBeenCalledWith('testKey', 'testValue');
    });

    it('운영 환경에서는주어진 키와 값으로 보안 쿠키를 설정', () => {
      process.env.NODE_ENV = 'production';

      setCookie(mockRes as Response, 'testKey', 'testValue');

      expect(mockRes.cookie).toHaveBeenCalledWith('testKey', 'testValue', {
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
    it('개발 환경에서 주어진 키로 쿠키를 삭제', () => {
      process.env.NODE_ENV = 'development';

      clearCookie(mockRes as Response, 'testKey');

      expect(mockRes.clearCookie).toHaveBeenCalledWith('testKey');
    });

    it('프로덕션 환경에서 주어진 키로 쿠키를 삭제', () => {
      process.env.NODE_ENV = 'production';

      clearCookie(mockRes as Response, 'testKey');

      expect(mockRes.clearCookie).toHaveBeenCalledWith('testKey', {
        domain: 'zeabur.app',
        httpOnly: true,
        path: '/',
      });
    });
  });
});
