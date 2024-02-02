import React, { useCallback, useEffect, useState } from 'react';
import apiRequest from '../../lib/apiRequest';
import TodoList from '../../components/member/TodoList';
import requestWrite from '../../api/member/TodoWrite';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { produce } from 'immer';

const TodoListContainer = () => {
  const { t } = useTranslation();
  const [todoList, setTodoList] = useState([]);
  const [form, setForm] = useState({
    done: false,
    content: '',
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchTodoList = async () => {
      try {
        const response = await apiRequest('/todo/list', 'GET');
        setTodoList(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error('할 일 목록을 불러오는 중 에러 발생:', error);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };
    fetchTodoList();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();

      /**
       * 필수 항목
       */
      const requiredFields = {
        content: t('NotBlank_content'),
      };
      const _errors = {};
      let hasError = false; // 검증 실패 여부
      for (const field in requiredFields) {
        if (!form[field] || !form[field].trim()) {
          _errors[field] = _errors[field] || [];

          _errors[field].push(requiredFields[field]);

          hasError = true;
        }
      }

      if (hasError) {
        setErrors((errors) => _errors);

        return;
      }

      requestWrite(form)
        .then((response) => {
          const newTodo = response.data;
          console.log('새로운 To-do:', response.data); // 새로운 To-do 확인
          // 새로운 할일을 목록에 추가합니다.
          setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
          // 폼 초기화
          setForm({ content: '' });
          // 오류 메시지 초기화
          setErrors({});
          // 할일 목록 페이지로 이동
          navigate('/todo/list', { replace: true });
        })
        .catch((err) => setErrors(() => err.message));
    },
    [form, t, navigate],
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(
      produce((draft) => {
        draft[name] = value;
      }),
    );
  };

  const onToggle = useCallback(
    (clickedTodo) => {
      // 클릭된 할 일 객체 확인
      console.log('클릭된 할 일 객체:', clickedTodo);

      // 클릭된 할 일 객체의 done 속성을 토글하여 업데이트
      const updatedTodoList = todoList.map((todo) => {
        if (todo.gid === clickedTodo.gid) {
          // 할 일 객체를 복제하여 done 속성을 반전시킴
          const updatedTodo = { ...todo, done: !todo.done };
          console.log('변경된 할 일 객체:', updatedTodo); // 변경된 할 일 객체 확인
          return updatedTodo;
        }
        return todo;
      });

      // 업데이트된 할 일 목록을 상태에 반영하여 업데이트
      setTodoList(updatedTodoList);

      // 업데이트된 할 일 목록 확인
      console.log('업데이트된 할 일 목록:', updatedTodoList);
    },
    [todoList, setTodoList],
  );

  return (
    <TodoList
      todoList={todoList}
      handleFormSubmit={handleFormSubmit}
      errors={errors}
      handleInputChange={handleInputChange}
      form={form}
      onToggle={onToggle}
    />
  );
};

export default TodoListContainer;
