import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { FaUserGear } from 'react-icons/fa6';
import { FaUsersSlash } from 'react-icons/fa';

const SideMenu = () => {
  const { t } = useTranslation();

  return (
    <aside>
      <NavLink
        to="member/saveinfo"
        className={({ isActive }) => classNames({ on: isActive })}
      >
        <FaUserGear className="icons" />
        {t('개인정보수정')}
      </NavLink>
      <NavLink
        to="mypage/member/Withdrawal"
        className={({ isActive }) => classNames({ on: isActive })}
      >
        <FaUsersSlash className="icons" />
        {t('회원 탈퇴')}
      </NavLink>
    </aside>
  );
};

export default React.memo(SideMenu);
