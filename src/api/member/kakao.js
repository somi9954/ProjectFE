import axios from 'axios';

const rest_api_key = '617d3dffcc7595d0cc813068d9e8126b';
const redirect_uri = 'http://localhost:3000/member/kakao';

const auth_code_path = `https://kauth.kakao.com/oauth/authorize`;

const access_token_url = 'https://kauth.kakao.com/oauth/token';

export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?response_type=code&client_id=${rest_api_key}&redirect_uri=${redirect_uri}`;

  return kakaoURL;
};

export const getAccessToken = async (authCode) => {
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('client_id', rest_api_key);
  params.append('redirect_uri', redirect_uri);
  params.append('code', authCode);

  const header = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  const res = await axios.post(access_token_url, params.toString(), header);

  const accessToken = res.data.access_token;

  return accessToken;
};

export const getMemberWithAccessToken = async (accessToken) => {
  const REACT_APP = process.env.REACT_APP_API_URL;
  const res = await axios.get(
    `${REACT_APP}/api/member/kakao?accessToken=${accessToken}`,
  );
  return res.data;
};
