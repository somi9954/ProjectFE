import React, { useCallback, useEffect, useState } from 'react';
import apiRequest from '../../lib/apiRequest';
import TodoList from '../../components/member/TodoList';
import requestWrite from '../../api/member/TodoWrite';
import { useNavigate } from 'react-router-dom';

const TodoListContainer = () => {
  const [todoList, setTodoList] = useState([]);
  const [form, setForm] = useState({
    done: false,
    subject: '',
    content: '',
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchTodoList = async () => {
      try {
        const response = await apiRequest('/todo/list', 'GET');
        setTodoList(response.data.data); // 수정된 부분: 배열에 접근
        console.log(response.data.data); // 데이터 확인
      } catch (error) {
        console.error('할 일 목록을 불러오는 중 에러 발생:', error);
      }
    };
    fetchTodoList();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  const handleFormSubmit = (formData) => {
    // formData에서 필요한 데이터만 추출하여 새로운 객체를 생성
    const formDataToSend = {
      subject: formData.subject,
      content: formData.content,
    };

    requestWrite(formDataToSend)
      .then((response) => {
        // 새로운 할일을 목록에 추가합니다.
        setTodoList((prevTodoList) => [...prevTodoList, response.data]);
        // 폼 초기화
        setForm({ subject: '', content: '' });
        // 오류 메시지 초기화
        setErrors({});
        // 할일 목록 페이지로 이동
        navigate('/todo/list', { replace: true });
      })
      .catch((error) => {
        // 에러 메시지 설정
        console.error('요청 실패:', error);
        setErrors({ submitError: error.message });
      });
  };

  const onToggle = useCallback((clickedTodo) => {
    setTodoList((prevTodoList) => {
      return prevTodoList.map((todo) => {
        if (todo.gid === clickedTodo.gid) {
          return { ...todo, done: !todo.done };
        }
        return todo;
      });
    });
  }, []);

  return (
    <TodoList
      todoList={todoList}
      onToggle={onToggle}
      handleFormSubmit={handleFormSubmit}
    />
  );
};

export default TodoListContainer;
