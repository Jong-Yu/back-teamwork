import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async OAuthLogin(code) {
    // 1. 회원조회
    // const user = await this.userService.findOneByEmail(req.user.email); //user를 찾아서
    // 2, 회원가입이 안되어있다면? 자동회원가입
    // if (!user) user = await this.userService.create({ ...req.user }); //user가 없으면 하나 만들고, 있으면 이 if문에 들어오지 않을거기때문에 이러나 저러나 user는 존재하는게 됨.
    // 3. 회원가입이 되어있다면? 로그인(AT, RT를 생성해서 브라우저에 전송)한다
    // this.setRefreshToken({ user, res }); // 현재는 미구현
    // console.log('OAuthLogin', req.user, user);
    // res.redirect(process.env.KAKAO_REDIRECT_URL);
  }
}
