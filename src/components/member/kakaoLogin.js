import React from 'react';
import { getKakaoLoginLink } from '../../api/member/kakao';
import kakaoLogin from '../../images/kakaologin.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const link = getKakaoLoginLink();

const LoginBox = styled.div`
  img.Loingbtn {
    height: 40px;
    width: 300px;
  }
`;

const KakaoLogin = () => {
  return (
    <LoginBox>
      <Link to={link}>
        <img src={kakaoLogin} alt="Kakao Login" className="Loingbtn" />
      </Link>
    </LoginBox>
  );
};

export default KakaoLogin;
