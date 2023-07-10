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

    // 1. 회원조회
    // const user = await this.userService.findUserByEmail(profile.email); //user를 찾아서
    // 2, 회원가입이 안되어있다면? 자동회원가입
    // if (!user) user = await this.userService.create({ ...req.user }); //user가 없으면 하나 만들고, 있으면 이 if문에 들어오지 않을거기때문에 이러나 저러나 user는 존재하는게 됨.
    // 3. 회원가입이 되어있다면? 로그인(AT, RT를 생성해서 브라우저에 전송)한다
    // this.setRefreshToken({ user, res }); // 현재는 미구현
    // console.log('OAuthLogin', req.user, user);
    // res.redirect(process.env.KAKAO_REDIRECT_URL);

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
