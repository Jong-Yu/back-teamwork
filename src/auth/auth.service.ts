import axios from 'axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { KakaoTokenDto } from '../_model/auth/dto/kakao-token.dto';
import { UserKakaoDto } from '../_model/auth/dto/kakao-user.dto';
import { UserDto } from 'src/_model/user/dto/user.dto';
import { ReFreshTokenDto } from 'src/_model/auth/dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async getToken(code: string) {
    // 1. code를 이용해서 access_token 받기
    const token = await this.getKakaoToken(code);
    const kakaoToken = token.access_token;

    // 2. kakaoToken 이용해서 사용자 정보 받기
    const profile = await this.getKakaoProfile(kakaoToken);

    // 3. 사용자 정보를 통해 가입 여무 확인
    const user = await this.userService.findUserByEmail(profile.email);

    // 3, 회원가입이 안되어있다면? 자동회원가입
    const refreshToken = await this.getRefreshToken(profile, kakaoToken);
    if (!user) {
      // 3-1. 회원가입시 refresh_token을 DB 저장
      const cdo = {
        name: profile.name,
        email: profile.email,
        phone: '010-1111-1111',
        refresh_token: refreshToken,
      };

      await this.userService.create(cdo);
    } else {
      // 3-2. 회원가입이 되어있다면? refresh_token을 업데이트
      const udo = { refresh_token: refreshToken };
      await this.userService.update(profile.email, udo);
    }

    const jwtToken = await this.getJwtToken(profile, kakaoToken);

    return {
      accessToken: jwtToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    // cookie에 refresh_token이 없다면? 401 에러
    if (!refreshToken) {
      throw new UnauthorizedException('refresh token expired');
    }

    // refresh_token이 유효한지 확인
    const payload = this.jwtService.verify<ReFreshTokenDto>(refreshToken, {
      secret: process.env.JWT_SECRET,
    });

    // refresh_token의 email을 이용하여 사용자 정보를 가져옴
    const user = await this.userService.findUserByEmail(payload.email);

    // refresh_token이 DB에 저장된 refresh_token과 일치하는지 확인
    // 일치하지 않는다면? 401 에러
    if (user?.refresh_token !== refreshToken) {
      throw new UnauthorizedException('refresh token expired');
    }
    // 일치한다면? access_token 재발급
    const accessToken = await this.getJwtToken(user, payload.kakaoToken);

    // refresh_token 재발급
    const newRefreshToken = await this.getRefreshToken(
      user,
      payload.kakaoToken,
    );

    // newRefreshToken로 변경
    const udo = { refresh_token: newRefreshToken };
    await this.userService.update(payload.email, udo);

    console.log('auth 401', refreshToken);

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

  async getJwtToken(userKakao: UserKakaoDto | UserDto, kakaoToken: string) {
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

  async getRefreshToken(userKakao: UserKakaoDto | UserDto, kakaoToken: string) {
    const refreshToken = await this.jwtService.signAsync(
      {
        email: userKakao.email,
        kakaoToken,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '2w',
      },
    );

    return refreshToken;
  }

  async logout(accessToken: string) {
    const url = 'https://kapi.kakao.com/v1/user/unlink';
    const headers = {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    };
    const result = await axios.post(url, {}, { headers }).then(res => res.data);
    console.log(result);
  }
}
