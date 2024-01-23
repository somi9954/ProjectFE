import Header from '../../outlines/front/Header';
import Footer from '../../outlines/front/Footer';
import { Outlet } from 'react-router-dom';
import React from 'react';
import SideMenu from '../../outlines/front/SideMenu';
import MemberOnly from '../../components/authority/MemberOnly';

const MypageLayout = () => {
  return (
    <>
      <MemberOnly>
        <Header />
        <main className="mypage">
          <SideMenu />
          <section>
            <Outlet />
          </section>
        </main>
        <Footer />
      </MemberOnly>
    </>
  );
};

export default MypageLayout;
