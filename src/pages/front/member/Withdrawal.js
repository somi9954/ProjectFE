import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { MainTitle } from '../../../components/commons/TitleStyle';
import { OuterBox } from '../../../components/commons/OutlineStyle';
import WithdrawalContainer from '../../../containers/member/WithdrawalContainer';

const SaveInfo = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('회원 탈퇴')}</title>
      </Helmet>
      <OuterBox>
        <MainTitle $align="center">{t('회원 탈퇴')}</MainTitle>
        <WithdrawalContainer />
      </OuterBox>
    </>
  );
};

export default SaveInfo;
