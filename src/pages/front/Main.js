import UserContext from '../../modules/user';
import { useContext } from 'react';
import Footer from '../../outlines/front/Footer';

const Main = () => {
  const {
    state: { isLogin },
  } = useContext(UserContext);

  return (
    <>
      <h1>메인페이지</h1>
    </>
  );
};

export default Main;
