import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { MainTitle } from '../../components/commons/TitleStyle';
import { OuterBox } from '../../components/commons/OutlineStyle';
import MemberListContainer from '../../containers/admin/MemberListContainer';

const MemberList = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('회원 관리')}</title>
      </Helmet>
      <OuterBox>
        <MainTitle>{t('회원 관리')}</MainTitle>
        <MemberListContainer />
      </OuterBox>
    </>
  );
};
export default MemberList;
