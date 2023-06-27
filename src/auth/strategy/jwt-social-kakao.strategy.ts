import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

interface Profile {
  id: string;
  displayName: string;
  _json: {
    kakao_account: {
      email: string;
    };
  };
}

export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: '',
      callbackURL: process.env.KAKAO_CALLBACK_URL,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log('accessToken' + accessToken);
    console.log('refreshToken' + refreshToken);
    console.log(profile);

    return {
      name: profile.displayName,
      email: profile._json.kakao_account.email,
      password: profile.id,
    };
  }
}
