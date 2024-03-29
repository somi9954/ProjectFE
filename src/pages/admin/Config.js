import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { MainTitle } from '../../components/commons/TitleStyle';
import { OuterBox } from '../../components/commons/OutlineStyle';
import SiteContainer from '../../containers/admin/SiteContainer';

const Config = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('사이트 설정')}</title>
      </Helmet>
      <OuterBox>
        <MainTitle>{t('사이트 설정')}</MainTitle>
        <SiteContainer />
      </OuterBox>
    </>
  );
};
export default Config;
