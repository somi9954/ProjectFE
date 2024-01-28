import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { OuterBox } from '../../../components/commons/OutlineStyle';
import TodoWriteContainer from '../../../containers/member/TodoWriteContainer';
import { MainTitle } from '../../../components/commons/TitleStyle';

const TodoWrite = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('오늘의 할일 글쓰기')}</title>
      </Helmet>
      <OuterBox>
        <MainTitle>{t('오늘의 할일 쓰기')}</MainTitle>
        <TodoWriteContainer />
      </OuterBox>
    </>
  );
};

export default TodoWrite;
