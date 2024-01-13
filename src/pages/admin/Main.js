import { Helmet } from 'react-helmet-async';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Main = () => {
  const { t } = useTranslation();

  return (
    <Helmet>
      <title>{t('관리자 페이지')}</title>
    </Helmet>
  );
};

export default Main;
