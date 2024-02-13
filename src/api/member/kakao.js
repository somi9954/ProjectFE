import axios from 'axios';

const rest_api_key = '617d3dffcc7595d0cc813068d9e8126b';
const redirect_uri = 'http://localhost:3000/member/kakao';

const auth_code_path = `https://kauth.kakao.com/oauth/authorize`;

const access_token_url = 'https://kauth.kakao.com/oauth/token';

const client_secret = 'F3uvmeXmF8Sh2uBM2kqVZi8imEV6saWk';

export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?response_type=code&client_id=${rest_api_key}&redirect_uri=${redirect_uri}`;

  return kakaoURL;
};

// POST 요청 오류 처리
export const getAccessToken = async (authCode) => {
  try {
    const params = {
      grant_type: 'authorization_code',
      client_id: rest_api_key,
      client_secret: client_secret,
      redirect_uri: redirect_uri,
      code: authCode,
    };

    const formData = new URLSearchParams();
    for (const key in params) {
      formData.append(key, params[key]);
    }

    const res = await axios.post(access_token_url, formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const accessToken = res.data.access_token;

    return accessToken;
  } catch (error) {
    console.error('액세스 토큰을 가져오는 중에 오류가 발생했습니다:', error);
    throw error;
  }
};

// GET 요청 오류 처리
export const getMemberWithAccessToken = async (accessToken) => {
  try {
    const params = {
      accessToken: accessToken,
    };

    const REACT_APP = process.env.REACT_APP_API_URL;
    const res = await axios.get(`${REACT_APP}/member/kakao`, {
      params: params,
      headers: {
        Authorization: `'application/x-www-form-urlencoded ${accessToken}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error(
      '액세스 토큰으로 멤버 정보를 가져오는 중에 오류가 발생했습니다:',
      error,
    );
    throw error;
  }
};
