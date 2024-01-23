import { Helmet } from 'react-helmet-async';
import React, { useContext } from 'react';
import UserContext from '../../../modules/user';
import { useTranslation } from 'react-i18next';
import { InputText } from '../../../components/commons/InputStyle';
import sizeNames from '../../../styles/sizes';
import styled from 'styled-components';
import { OuterBox } from '../../../components/commons/OutlineStyle';
import { MainTitle } from '../../../components/commons/TitleStyle';
import { BigButton } from '../../../components/commons/ButtonStyle';
import User from '../../../images/user.png';

import { NavLink } from 'react-router-dom';

const { medium } = sizeNames;

const UserInfo = styled.dl`
  dl {
    display: flex;
    padding: 10px 15px;
    align-items: center;

    dt {
      width: 130px;
      font-size: ${medium};
      font-weight: bold;
    }

    dd {
      flex-grow: 1;
    }
  }

  dl + dl {
    border-top: 1px solid #d5d5d5;
  }

  dl:last-of-type {
    margin-bottom: 15px;
  }
  .user {
    margin: 0 auto;
    display: block;
    width: 150px;
  }
`;

const Main = () => {
  const { t } = useTranslation();
  const { state } = useContext(UserContext);

  return (
    <>
      <Helmet>
        <title>{t('마이페이지')}</title>
      </Helmet>
      <OuterBox>
        <MainTitle>{t('마이페이지')}</MainTitle>
        <UserInfo>
          <img src={User} className="user" alt="user" />
          <dl>
            <dt>{t('아이디')}</dt>
            <dd>
              <InputText
                type="text"
                defaultValue={state.userInfo.email || ''}
              />
            </dd>
          </dl>
          <dl>
            <dt>{t('이름')}</dt>
            <dd>
              <InputText type="text" defaultValue={state.userInfo.name || ''} />
            </dd>
          </dl>
          <dl>
            <dt>{t('휴대전화번호')}</dt>
            <dd>
              <InputText
                type="text"
                defaultValue={state.userInfo.mobile || ''}
              />
            </dd>
          </dl>
        </UserInfo>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <NavLink to="member/saveinfo">
            <BigButton
              color="info"
              bcolor="info"
              height="50px"
              size="medium"
              className="button"
              style={{ width: '200px' }}
            >
              {t('회원정보수정')}
            </BigButton>
          </NavLink>
          <NavLink to="member/Withdrawal">
            <BigButton
              color="white"
              bcolor="info"
              height="50px"
              size="medium"
              fcolor="info"
              className="button"
              style={{ width: '200px' }}
            >
              {t('회원탈퇴')}
            </BigButton>
          </NavLink>
        </div>
      </OuterBox>
    </>
  );
};

export default Main;
