import React from 'react';
import UserContext from '../../modules/user'; // 사용자 컨텍스트를 가져옵니다.
import LoginContainer from '../../containers/member/LoginContainer'; // 로그인 컨테이너를 가져옵니다.
import { useContext } from 'react';
import TodoListContainer from '../../containers/member/TodoListContainer';
import { OuterBox } from '../../components/commons/OutlineStyle';
import styled from 'styled-components';
import sizeNames from '../../styles/sizes';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { SubTitle } from '../../components/commons/TitleStyle';

const { medium, big } = sizeNames;

const ListBox = styled.div`
  .title h1 {
    text-align: center;
    font-size: 35px;
    background: #f09a97;
    height: 50px;
    border-radius: 5px;
    color: #f0e1e1;
    margin: 0;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 65px;
    border-radius: 5px;
    border: 1px solid #f09a97;
  }

  .date {
    text-align: center;
    font-size: ${big};
    color: #de4a47;
    font-weight: bold;
  }

  .checked span {
    position: relative;
  }

  .checked span::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: black;
    bottom: 50%;
    left: 0;
    transform: translateY(50%);
  }

  .minusbtn {
    margin-left: auto;
    margin-right: 15px;
  }
  .content {
    margin-left: 15px;
    font-size: ${medium};
  }

  .todo {
    color: #fff;
    font-size: ${medium};
  }

  svg {
    margin-left: 5px;
    font-size: ${medium};
  }
  .plustodo {
    display: flex;
  }

  .btn {
    margin-left: 5px;
  }
  .no_data {
    background: #f54a39;
    color: #fff;
    display: inline-block;
    padding: 3px 15px;
    border-radius: 5px;
    justify-items: center;
    font-size: ${medium};
  }
`;

const Main = () => {
  const {
    state: { isLogin },
  } = useContext(UserContext); // 사용자 로그인 상태를 가져옵니다.

  const { t } = useTranslation();

  return (
    <div>
      <Helmet>
        <title>{t('오늘의 할일')}</title>
      </Helmet>
      {/* 로그인된 상태인 경우에만 TodoList 컴포넌트를 렌더링합니다. */}
      {isLogin ? (
        <OuterBox>
          <ListBox>
            <TodoListContainer />
          </ListBox>
        </OuterBox>
      ) : (
        <div>
          <SubTitle $align="center">{t('로그인')}</SubTitle>
          <LoginContainer />
        </div>
      )}
    </div>
  );
};

export default Main;
