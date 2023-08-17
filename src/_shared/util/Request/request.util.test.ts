import { Request } from 'express';
import { describe, it, expect, beforeEach } from 'vitest';
import {
  getAccessTokenInCookie,
  getRefreshTokenInCookie,
} from './request.util';

describe('request.util', () => {
  let mockReq: Partial<Request>;

  // 각 테스트 케이스 실행 전에 항상 실행되는 부분
  beforeEach(() => {
    process.env.NODE_ENV = 'test';

    // Response의 메서드들을 mock 함수로 초기화
    mockReq = {
      cookies: {
        access_token: 'test_access_token',
        refresh_token: 'test_refresh_token',
      },
    };
  });

  describe('getAccessTokenInCookie', () => {
    it('request에서 access_token 가져오기.', () => {
      const accessToken = getAccessTokenInCookie(mockReq as Request);

      expect(accessToken).toBe('test_access_token');
    });
  });

  describe('getRefreshTokenInCookie', () => {
    it('주어진 request에서 refresh_token 가져오기.', () => {
      const refreshToken = getRefreshTokenInCookie(mockReq as Request);

      expect(refreshToken).toBe('test_refresh_token');
    });
  });
});
