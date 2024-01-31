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

  useEffect(() => {
    const fetchTodoList = async () => {
      try {
        const response = await apiRequest('/todo/list', 'GET');
        setTodoList(response.data.data); // 배열에 접근
        console.log(response.data.data); // 데이터 확인
      } catch (error) {
        console.error('할 일 목록을 불러오는 중 에러 발생:', error);
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
          console.log('새로운 To-do:', response.data); // 새로운 To-do 확인
          const newTodo = response.data;
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

  const onToggle = useCallback((clickedTodo) => {
    console.log('clickedTodo:', clickedTodo); // 클릭된 할 일 객체 확인
    setTodoList((prevTodoList) => {
      console.log('prevTodoList:', prevTodoList); // 이전 할 일 목록 확인
      return prevTodoList.map((todo) => {
        if (clickedTodo && todo.gid === clickedTodo.gid) {
          console.log('Updating todo:', todo); // 업데이트할 할 일 확인
          const updatedTodo = { ...todo, done: !todo.done };
          console.log('Updated todo:', updatedTodo); // 업데이트된 할 일 확인
          return updatedTodo;
        }
        return todo;
      });
    });
  }, []);

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
