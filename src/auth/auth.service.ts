import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { KakaoTokenDto } from 'src/_model/auth/dto/kakao-token.dto';
import { UserKakaoDto } from 'src/_model/auth/dto/kakao-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async getToken(code: string) {
    const token = await this.getKakaoToken(code);

    const access_token = token.access_token;

    console.log(access_token);

    const profile = await this.getKakaoProfile(access_token);

    console.log(profile);

    // 1. 회원조회
    const user = await this.userService.findUserByEmail(profile.email); //user를 찾아서

    console.log(user);

    // 2, 회원가입이 안되어있다면? 자동회원가입
    if (!user) {
      await this.userService.create({
        name: profile.name,
        email: profile.email,
        phone: '010-1111-1111',
      });
    }
    // 3. 회원가입이 되어있다면? 로그인(AT, RT를 생성해서 브라우저에 전송)한다
    // access_token, refresh_token을 생성해(?) 카카오 token을 쓰던지, 우리가 만든 token을 쓰던지
    // access_token은 브라우저에 전송
    // refresh_token은 DB에 저장

    return access_token;
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

    console.log('profile', profile);

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
