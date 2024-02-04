import React, { useCallback, useEffect, useState } from 'react';
import apiRequest from '../../lib/apiRequest';
import TodoList from '../../components/member/TodoList';
import requestWrite from '../../api/member/TodoWrite';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { produce } from 'immer';
import requestDelete from '../../api/member/todoDelete';

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

  useEffect(() => {
    fetchTodoList();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  const handleFormSubmit = useCallback(
    async (e) => {
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

      try {
        const newTodo = {
          ...form,
          done: false, // 새로운 할 일을 추가할 때 done 속성을 명시적으로 false로 설정
        };

        const response = await requestWrite(newTodo);

        // 새로운 할일을 목록에 추가한 후에 목록을 다시 불러옵니다.
        fetchTodoList();

        // 새로운 할 일을 기존의 할 일 목록에 추가하기 위해 업데이트
        setTodoList((prevTodoList) => [...prevTodoList, newTodo]);

        // 폼 초기화
        setForm((prevForm) => ({
          ...prevForm,
          content: '',
        }));

        // 오류 메시지 초기화
        setErrors({});

        // 할일 목록 페이지로 이동
        navigate('/todo/list', { replace: true });
      } catch (error) {
        console.error('할 일 추가 중 에러 발생:', error);
        setErrors(() => error.message);
      }
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
      // 클릭된 할 일 객체만 수정하고 나머지는 그대로 유지하는 새로운 배열 생성
      const updatedTodoList = todoList.map((todo) => {
        if (todo.gid === clickedTodo.gid) {
          const updatedTodo = { ...todo, done: !todo.done };
          console.log('Updated todo:', updatedTodo);
          // 클릭된 할 일 객체의 done 속성 변경 없이 그대로 유지
          return updatedTodo;
        }
        return todo;
      });

      // 수정된 할 일 목록을 상태에 반영하여 업데이트
      setTodoList(updatedTodoList);
    },
    [todoList, setTodoList],
  );

  const handleDelete = useCallback(
    (todoToDelete) => {
      try {
        console.log('할 일 삭제 요청:', todoToDelete);

        if (
          !todoToDelete.seq ||
          typeof todoToDelete.seq !== 'number' ||
          isNaN(todoToDelete.seq)
        ) {
          console.error('유효하지 않은 할 일 식별자입니다:', todoToDelete);
          return;
        }

        requestDelete(todoToDelete.seq)
          .then(() => {
            console.log('할 일 삭제 성공');
            setTodoList((prevTodoList) =>
              prevTodoList.filter((todo) => todo.seq !== todoToDelete.seq),
            );
          })
          .catch((error) => {
            console.error('할 일 삭제 중 에러 발생:', error);
            console.error('에러가 발생한 위치:', error.stack);
            console.error('에러 메시지:', error.message);
          });
      } catch (error) {
        console.error('할 일 삭제 중 에러 발생:', error);
      }
    },
    [setTodoList, requestDelete],
  );

  return (
    <TodoList
      todoList={todoList}
      handleFormSubmit={handleFormSubmit}
      errors={errors}
      handleInputChange={handleInputChange}
      form={form}
      onToggle={onToggle}
      handleDelete={handleDelete}
    />
  );
};

export default TodoListContainer;
