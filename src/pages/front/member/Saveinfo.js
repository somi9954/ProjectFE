import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { MainTitle } from '../../../components/commons/TitleStyle';
import SaveInfoContainer from '../../../containers/member/SaveInfoContainer';
import { OuterBox } from '../../../components/commons/OutlineStyle';

const SaveInfo = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('회원정보수정')}</title>
      </Helmet>
      <OuterBox>
        <MainTitle $align="center">{t('회원정보수정')}</MainTitle>
        <SaveInfoContainer />
      </OuterBox>
    </>
  );
};

export default SaveInfo;
