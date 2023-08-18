import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AuthService } from './auth.service';
import { describe, beforeEach, vi, afterEach, it } from 'vitest';
import { AuthController } from './auth.controller';
import * as request from 'supertest';

describe('AuthController', () => {
  let app: INestApplication;
  let authService: Partial<AuthService>;

  beforeEach(async () => {
    authService = {
      isValidToken: vi.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('isValid', () => {
    it('should check if token is valid', async () => {
      //   authService.isValidToken.mockReturnValue(true);

      return request(app.getHttpServer())
        .get('/auth/isvalid')
        .expect(200, true);
    });
  });
});
