import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { KakaoTokenDto } from 'src/_model/auth/dto/kakao-token.dto';
import { UserKakaoDto } from 'src/_model/auth/dto/kakao-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async getToken(code: string) {
    // 1. code를 이용해서 access_token 받기
    const token = await this.getKakaoToken(code);
    const access_token = token.access_token;

    // 2. access_token을 이용해서 사용자 정보 받기
    const profile = await this.getKakaoProfile(access_token);

    // 3. 사용자 정보를 통해 가입 여무 확인
    const user = await this.userService.findUserByEmail(profile.email);

    // 3, 회원가입이 안되어있다면? 자동회원가입
    const refreshToken = await this.setRefreshToken(profile);
    if (!user) {
      // 3-1. 회원가입시 refresh_token을 DB 저장
      await this.userService.create({
        name: profile.name,
        email: profile.email,
        phone: '010-1111-1111',
        refreshToken,
      });
    } else {
      // 3-2. 회원가입이 되어있다면? refresh_token을 업데이트
      await this.userService.update(profile.email, {
        refreshToken,
      });
    }

    return await this.getJwtToken(profile);
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

  async getKakaoProfile(access_token: string): Promise<UserKakaoDto> {
    const url = 'https://kapi.kakao.com/v2/user/me';
    const headers = {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      Authorization: `Bearer ${access_token}`,
    };

    const profile = await axios.get(url, { headers }).then(res => res.data);

    // profile {
    //   id: 2876387111,
    //   connected_at: '2023-07-10T08:23:59Z',
    //   properties: { nickname: '박종유' },
    //   kakao_account: {
    //     profile_nickname_needs_agreement: false,
    //     profile: { nickname: '박종유' },
    //     has_email: true,
    //     email_needs_agreement: false,
    //     is_email_valid: true,
    //     is_email_verified: true,
    //     email: 'jongyu16@gmail.com',
    //     has_birthday: true,
    //     birthday_needs_agreement: false,
    //     birthday: '0705',
    //     birthday_type: 'SOLAR'
    //   }
    // }

    return {
      name: profile.properties.nickname,
      email: profile.kakao_account.email,
      kakaoId: profile.id,
    };
  }

  async getJwtToken(userKakao: UserKakaoDto) {
    return this.jwtService.signAsync(
      {
        email: userKakao.email,
        name: userKakao.name,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h',
      },
    );
  }

  async setRefreshToken(userKakao: UserKakaoDto) {
    const refreshToken = await this.jwtService.signAsync(
      {
        email: userKakao.email,
        name: userKakao.name,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '2w',
      },
    );

    return refreshToken;
  }

  async logout(access_token: string) {
    const url = 'https://kapi.kakao.com/v1/user/unlink';
    const headers = {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      Authorization: `Bearer ${access_token}`,
    };

    const result = await axios.post(url, {}, { headers }).then(res => res.data);

    console.log(result);
  }
}
