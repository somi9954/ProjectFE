import React from 'react';
import { useSearchParams } from 'react-router-dom';

const KakaoRedirectContainer = () => {
  const [searchParams] = useSearchParams();

  const authCode = searchParams.get('code');
  return (
    <div>
      <div>KaKao Login Redirect</div>
      <div>{authCode}</div>
    </div>
  );
};

export default KakaoRedirectContainer;
