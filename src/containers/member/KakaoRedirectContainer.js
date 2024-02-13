import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  getAccessToken,
  getMemberWithAccessToken,
} from '../../api/member/kakao';

const KakaoRedirectContainer = () => {
  const [searchParams] = useSearchParams();

  const authCode = searchParams.get('code');

  useEffect(() => {
    getAccessToken(authCode).then((accessToken) => {
      getMemberWithAccessToken(accessToken).then((result) => {
        console.log('----------------------------');
        console.log('result');
      });
    });
  }, [authCode]);
  return (
    <div>
      <div>KaKao Login Redirect</div>
      <div>{authCode}</div>
    </div>
  );
};

export default KakaoRedirectContainer;
