import React, { useCallback, useEffect, useState } from 'react';
import apiRequest from '../../lib/apiRequest';
import TodoList from '../../components/member/TodoList';

const TodoListContainer = () => {
  const [todoList, setTodoList] = useState([]);
  const [form, setForm] = useState({
    agree: false,
  });

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

  const onToggle = useCallback((clickedTodo) => {
    setTodoList((prevTodoList) => {
      return prevTodoList.map((todo) => {
        if (todo.gid === clickedTodo.gid) {
          return { ...todo, agree: !todo.agree };
        }
        return todo;
      });
    });
  }, []);

  return <TodoList todoList={todoList} onToggle={onToggle} />;
};

export default TodoListContainer;
