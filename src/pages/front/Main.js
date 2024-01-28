import LoginContainer from '../../containers/member/LoginContainer';
import UserContext from '../../modules/user';
import { useContext } from 'react';
import { SubTitle } from '../../components/commons/TitleStyle';
import { useTranslation } from 'react-i18next';

const Main = () => {
  const {
    state: { isLogin },
  } = useContext(UserContext);
  const { t } = useTranslation();

  return isLogin ? (
    <h1>메인페이지...</h1>
  ) : (
    <>
      <SubTitle $align="center">{t('로그인')}</SubTitle>
      <LoginContainer />
    </>
  );
};

export default Main;
