import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { IoSettingsOutline } from 'react-icons/io5';
import { FaUsers } from 'react-icons/fa';

const SideMenu = () => {
  const { t } = useTranslation();

  return (
    <aside>
      <NavLink
        to="/admin/config"
        className={({ isActive }) => classNames({ on: isActive })}
      >
        <IoSettingsOutline className="icons" />
        {t('사이트 설정')}
      </NavLink>
      <NavLink
        to="/admin/memberlist"
        className={({ isActive }) => classNames({ on: isActive })}
      >
        <FaUsers className="icons" />
        {t('회원 관리')}
      </NavLink>
    </aside>
  );
};

export default React.memo(SideMenu);
