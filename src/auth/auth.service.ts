import axios from 'axios';
import { Request } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { KakaoTokenDto } from '../_model/auth/dto/kakao-token.dto';
import { ReFreshTokenDto } from '../_model/auth/dto/refresh-token.dto';
import { UserKakaoDto } from '../_model/auth/dto/kakao-user.dto';
import { UserDto } from '../_model/user/dto/user.dto';
import { AccessTokenDto } from '../_model/auth/dto/access-token.dto';
import { getTokenInRequest } from '../_shared/request.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async isValidToken(req: Request) {
    // 1. AccessToken refreshToken 가져오기
    const accessToken = getTokenInRequest(req);
    const refreshToken = req.cookies['refresh_token'];

    // 2. 쿠키에 refresh_token이 없다면 401 에러 발생
    if (!refreshToken) {
      throw new UnauthorizedException('none refresh token');
    }

    try {
      // 3. accessToken 유효성 확인
      this.jwtService.verify<AccessTokenDto>(accessToken, {
        secret: process.env.JWT_SECRET,
      });
    } catch {
      throw new UnauthorizedException('access token expired');
    }

    try {
      // 4. refreshToken 유효성 확인
      this.jwtService.verify<AccessTokenDto>(refreshToken, {
        secret: process.env.JWT_SECRET,
      });
    } catch {
      throw new UnauthorizedException('refresh token expired');
    }

    // 5. 위의, 3, 4번에서 에러가 발생하지 않았다면, true 응답
    return true;
  }

  async getToken(code: string) {
    // 1. 코드를 이용하여 access_token 얻기
    const token = await this.getKakaoToken(code);
    const kakaoToken = token.access_token;

    // 2. kakaoToken을 이용하여 사용자 정보 얻기
    const profile = await this.getKakaoProfile(kakaoToken);

    // 3. 사용자 정보를 이용하여 회원가입 여부 확인
    const user = await this.userService.findUserByEmail(profile.email);

    // 4. 회원가입이 되어있지 않다면 자동 회원가입
    let refreshToken = '';
    if (!user) {
      const cdo = {
        name: profile.name,
        email: profile.email,
        phone: '010-1111-1111',
      };

      // 4.1 회원가입 후 refresh_token 발급
      const newUser = await this.userService.create(cdo);
      refreshToken = await this.getRefreshToken(newUser, kakaoToken);
    } else {
      // 4.2 회원가입이 되어있다면 refresh_token 발급
      refreshToken = await this.getRefreshToken(user, kakaoToken);
    }

    // 5. refresh_token을 DB에 저장
    const udo = { refresh_token: refreshToken };
    await this.userService.update(profile.email, udo);

    const jwtToken = await this.getJwtToken(user, kakaoToken);

    return {
      accessToken: jwtToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    // 1. 쿠키에 refresh_token이 없다면 401 에러 발생
    if (!refreshToken) {
      throw new UnauthorizedException('none refresh token');
    }

    // 2. refresh_token의 유효성 확인
    const payload = this.jwtService.verify<ReFreshTokenDto>(refreshToken, {
      secret: process.env.JWT_SECRET,
    });

    // 3. refresh_token의 이메일을 이용하여 사용자 정보 가져오기
    const user = await this.userService.findUserByEmail(payload.email);

    // 4. DB에 저장된 refresh_token과 입력받은 refresh_token이 일치하는지 확인
    // 5. 일치하지 않는다면 401 에러 발생, 일치한다면 access_token 재발급
    if (user?.refresh_token !== refreshToken) {
      throw new UnauthorizedException('refresh token expired');
    }

    const accessToken = await this.getJwtToken(user, payload.kakaoToken);

    // 6. refresh_token 재발급 및 변경
    const newRefreshToken = await this.getRefreshToken(
      user,
      payload.kakaoToken,
    );
    const udo = { refresh_token: newRefreshToken };
    await this.userService.update(payload.email, udo);

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  async getKakaoToken(code: string): Promise<KakaoTokenDto> {
    const url = 'https://kauth.kakao.com/oauth/token';
    const headers = {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    const data = `grant_type=authorization_code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_CALLBACK_URL}&code=${code}`;

    return await axios
      .post<KakaoTokenDto>(url, data, { headers })
      .then(res => res.data);
  }

  async getKakaoProfile(accessToken: string): Promise<UserKakaoDto> {
    const url = 'https://kapi.kakao.com/v2/user/me';
    const headers = {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    };

    const profile = await axios.get(url, { headers }).then(res => res.data);

    return {
      name: profile.properties.nickname,
      email: profile.kakao_account.email,
    };
  }

  async getJwtToken(userKakao: UserDto, kakaoToken: string) {
    return this.jwtService.signAsync(
      {
        email: userKakao.email,
        name: userKakao.name,
        kakaoToken,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '10m',
      },
    );
  }

  async getRefreshToken(user: UserDto, kakaoToken: string) {
    const refreshToken = await this.jwtService.signAsync(
      {
        id: user.id,
        email: user.email,
        kakaoToken,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '2w',
      },
    );

    return refreshToken;
  }

  async logout(req: Request) {
    // 1. Request에 있는 Access Token을 가져온다.
    const access_token = getTokenInRequest(req);

    // 2. Access Token을 이용하여 Payload를 가져온다.
    const payload = this.jwtService.decode(access_token);

    // 3. Payload에 있는 Kakao Access Token을 이용하여 카카오 로그아웃
    this.logoutKakao(payload['kakaoToken'] || '');

    // 4. DB에 저장된 refresh_token을 삭제
    this.userService.update(payload['email'], { refresh_token: '' });
  }

  async logoutKakao(kakaoToken: string) {
    try {
      const url = 'https://kapi.kakao.com/v1/user/unlink';
      const headers = {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: `Bearer ${kakaoToken}`,
      };
      await axios.post(url, {}, { headers }).then(res => res.data);
    } catch {
      console.log('Already Kakao Access Token expired');
    }
  }
}
