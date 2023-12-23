import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import Logo from '../../images/logo/logo.png';
import colorNames from '../../styles/colors';
const { info } = colorNames;

const OuterBox = styled.header`
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 0 15px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;

  .right {
    a {
      display: inline-block;
      border: 1px solid ${info};
      height: 28px;
      border-radius: 3px;
      line-height: 26px;
      color: ${info};
      font-weight: 700;
      width: 90px;
      text-align: center;
      margin-left: 5px;

      &.on {
        background: ${info};
        color: #fff;
      }
    }
  }
  .left {
    .logo {
      width: 240px;
      text-align: right;
    }
  }
`;

const Header = () => {
  const { t } = useTranslation();
  return (
    <OuterBox>
      <div className="left">
        <NavLink to="/">
          <img src={Logo} className="logo" alt="로고" />
        </NavLink>
      </div>
      <div className="right">
        <NavLink
          to="/login"
          className={({ isActive }) => classNames({ on: isActive })}
        >
          {t('로그인')}
        </NavLink>
        <NavLink
          to="/join"
          className={({ isActive }) => classNames({ on: isActive })}
        >
          {t('회원가입')}
        </NavLink>
      </div>
    </OuterBox>
  );
};

export default Header;
