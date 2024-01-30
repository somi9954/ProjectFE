import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { OuterBox } from '../../../components/commons/OutlineStyle';
import TodoListContainer from '../../../containers/member/TodoListContainer';

const TodoList = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('오늘의 할일')}</title>
      </Helmet>
      <OuterBox>
        <TodoListContainer />
      </OuterBox>
    </>
  );
};

export default TodoList;
