import axios from 'axios';
import { KakaoTokenDto } from '../_model/kakao/dto/kakao-token.dto';
import { KakaoUserDto } from '../_model/kakao/dto/kakao-user.dto';
import { KakaoRefreshTokenDto } from '../_model/kakao/dto/kakao-refresh-token.dto';

/**
 * 카카오 토큰을 가져옵니다.
 * @param code
 * @returns
 */
export async function getKakaoToken(code: string): Promise<KakaoTokenDto> {
  const url = 'https://kauth.kakao.com/oauth/token';
  const headers = {
    'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  };

  const data = {
    grant_type: 'authorization_code',
    client_id: process.env.KAKAO_CLIENT_ID,
    redirect_uri: process.env.KAKAO_CALLBACK_URL,
    code: code,
  };

  return await axios
    .post<KakaoTokenDto>(url, data, { headers })
    .then(res => res.data);
}

/**
 * 카카오 토큰으로 카카오 프로필을 가져옵니다.
 * @param accessToken
 * @returns
 */
export async function getKakaoProfile(
  accessToken: string,
): Promise<KakaoUserDto> {
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

/**
 * 카카오 로그아웃
 * @param kakaoToken
 */
export async function logoutKakao(kakaoToken: string) {
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

/**
 * 카카오 토큰 검증
 * @param token
 * @returns
 */
export async function verify(token: string): Promise<KakaoUserDto> {
  const url = 'https://kapi.kakao.com/v1/user/access_token_info';
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // 1. 401 에러가 발생하면 토큰이 만료
  await axios.get(url, { headers });

  // 2. 만료가 아니면 토큰이 유효 유효한 토큰으로 카카오 프로필을 가져옵니다.
  return await getKakaoProfile(token);
}

/**
 * 카카오 토큰 갱신
 */
export async function reissue(
  refreshToken: string,
): Promise<KakaoRefreshTokenDto> {
  const url = 'https://kauth.kakao.com/oauth/token';
  const headers = {
    'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  };

  const data = {
    grant_type: 'refresh_token',
    client_id: process.env.KAKAO_CLIENT_ID,
    refresh_token: refreshToken,
  };

  return axios.post(url, data, { headers }).then(res => res.data.access_token);
}
