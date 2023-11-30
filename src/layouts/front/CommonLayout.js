import Header from '../../outlines/front/Header';
import Footer from '../../outlines/front/Footer';
import { Outlet } from 'react-router-dom';

const CommonLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default CommonLayout;
