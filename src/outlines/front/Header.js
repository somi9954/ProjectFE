import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const OuterBox = styled.header``;

const Header = () => {
  const { t } = useTranslation();
  return (
    <OuterBox>
      <NavLink to="/login">{t('로그인')}</NavLink>
      <NavLink to="/join">{t('회원가입')}</NavLink>
    </OuterBox>
  );
};

export default Header;
