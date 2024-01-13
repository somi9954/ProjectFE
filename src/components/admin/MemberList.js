import { useTranslation } from 'react-i18next';
import React from 'react';

const MemberList = () => {
  const { t } = useTranslation();
  return (
    <>
      <dl>
        <dt>{t('사이트 제목')}</dt>
      </dl>
    </>
  );
};
