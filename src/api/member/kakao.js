import axios from 'axios';

const rest_api_key = '0a96ba162d35a5fae3d0c1fbccec54b1';
const redirect_uri = 'http://localhost:3000/member/kakao';

const auth_code_path = `https://kauth.kakao.com/oauth/authorize`;

const access_token_url = 'https://kauth.kakao.com/oauth/token';

const client_secret = 'F3uvmeXmF8Sh2uBM2kqVZi8imEV6saWk';

export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  return kakaoURL;
};

// POST 요청 오류 처리
export const getAccessToken = async (authCode) => {
  const header = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  const params = {
    grant_type: 'authorization_code',
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
  };

  const res = await axios.post(access_token_url, params, header);

  const accessToken = res.data.access_token;

  return accessToken;
};

// GET 요청 오류 처리

export const getMemberWithAccessToken = async (accessToken) => {
  const REACT_APP = process.env.REACT_APP_API_URL;
  const res = await axios.get(
    `${REACT_APP}/member/kakao?accessToken=${accessToken}`,
  );

  return res.data;
};
