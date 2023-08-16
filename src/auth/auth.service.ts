import { Request } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import {
  getAccessTokenInCookie,
  getRefreshTokenInCookie,
} from '../_shared/util/Request/request.util';
import {
  getKakaoProfile,
  getKakaoToken,
  logoutKakao,
  reissue,
  verify,
} from '../_shared/util/Kakao/kakao.util';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async isValidToken(req: Request) {
    // 이 함수는 토큰이 유요한지 여부만 판단하는 함수이고,
    // 401로 error를 발생시키면서 로그인 페이지로 이동시키는 함수는 아닙니다.
    // 그래서 토큰이 유효하지 않다면, false를 반환하고, 유효하다면 true를 반환합니다.

    // 1. AccessToken refreshToken 가져오기
    const accessToken = getAccessTokenInCookie(req);
    const refreshToken = getRefreshTokenInCookie(req);

    // 2. 쿠키에 refresh_token이 없다면 401 에러 발생
    if (!refreshToken) {
      return false;
    }

    try {
      // 3. accessToken 유효성 확인
      await verify(accessToken);
    } catch {
      return false;
    }

    try {
      // 4. refreshToken 유효성 확인
      await verify(refreshToken);
    } catch {
      return false;
    }

    // 5. 위의, 3, 4번에서 에러가 발생하지 않았다면, true 응답
    return true;
  }

  async getToken(code: string) {
    // 1. 코드를 이용하여 카카오 토큰얻기 얻기
    const kakaoToken = await getKakaoToken(code);

    // 2. kakaoToken을 이용하여 사용자 정보 얻기
    const profile = await getKakaoProfile(kakaoToken.access_token);

    // 3. 사용자 정보를 이용하여 회원가입 여부 확인
    const user = await this.userService.findUserByEmail(profile.email);

    // 4. 회원가입이 되어있지 않다면 자동 회원가입
    if (!user) {
      const cdo = {
        name: profile.name,
        email: profile.email,
        refreshToken: kakaoToken.refresh_token,
      };

      await this.userService.create(cdo);
    } else {
      // 4.3 회원가입이 되어있다면 refresh_token 변경
      const udo = { refresh_token: kakaoToken.refresh_token };
      await this.userService.update(profile.email, udo);
    }

    return {
      accessToken: kakaoToken.access_token,
      refreshToken: kakaoToken.refresh_token,
    };
  }

  async reissueToken(refreshToken: string) {
    // 1. 쿠키에 refresh_token이 없다면 401 에러 발생
    if (!refreshToken) {
      throw new UnauthorizedException('none refresh token');
    }

    // 2. refresh_token의 유효성 확인
    const profile = await verify(refreshToken);

    // 3. 2번에서 에러가 발생하지 않았다면 refresh_token이 유효하다는 의미
    //    따라서, refresh_token을 이용하여 카카오에서 토큰 재발급
    const newKakaoToken = await reissue(refreshToken);

    // 4. 만약 newKakaoToken에 refresh_token 이 있으면, refresh_token을 업데이트
    const udo = { refresh_token: newKakaoToken.refresh_token };
    await this.userService.update(profile.email, udo);

    return {
      accessToken: newKakaoToken.access_token,
      refreshToken,
    };
  }

  async logout(req: Request) {
    // 1. Request에 있는 Access Token을 가져온다.
    const access_token = getAccessTokenInCookie(req);

    // 2. 로그아웃 요청
    logoutKakao(access_token);
  }
}
