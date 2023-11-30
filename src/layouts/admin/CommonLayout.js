import Header from '../../outlines/admin/Header';
import Footer from '../../outlines/admin/Footer';
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
