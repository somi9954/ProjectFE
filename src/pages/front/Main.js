import LoginContainer from '../../containers/member/LoginContainer';
import UserContext from '../../modules/user';
import { useContext } from 'react';
import Login from './member/Login';
import Diary from './member/Diary';

const Main = () => {
  const {
    state: { isLogin, userInfo },
  } = useContext(UserContext);

  return isLogin ? (
    <Diary />
  ) : (
    <>
      <Login>
        <LoginContainer />
      </Login>
    </>
  );
};

export default Main;
