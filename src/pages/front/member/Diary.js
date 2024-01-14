import MemberOnly from '../../../components/authority/MemberOnly';
import CalendarContainer from '../../../containers/member/CalendarContainer';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
const Diary = () => {
  const { t } = useTranslation();
  return (
    <MemberOnly>
      <Helmet>
        <title>{t('다이어리')}</title>
      </Helmet>
      <CalendarContainer />
    </MemberOnly>
  );
};

export default Diary;
