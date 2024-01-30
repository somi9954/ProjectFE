import React from 'react';
import styled from 'styled-components';
import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr';
import sizeNames from '../../styles/sizes';

const { small, medium, big } = sizeNames;

const ListBox = styled.div`
  .title h1 {
    text-align: center;
    font-size: 35px;
    background: #f09a97;
    height: 50px;
    border-radius: 5px;
    color: #f0e1e1;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 65px;
    border-radius: 5px;
    border: 1px solid #f09a97;
  }

  .date {
    text-align: center;
    font-size: ${big};
    color: #de4a47;
    font-weight: bold;
  }

  .checked span {
    position: relative;
  }

  .checked span::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: black;
    bottom: 50%;
    left: 0;
    transform: translateY(50%);
  }
  .content {
    margin-left: 15px;
    font-size: ${medium};
  }
  svg {
    margin-left: 5px;
    font-size: ${medium};
  }
`;

const TodoList = ({ todoList, onToggle }) => {
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };

  console.log(todoList); // 데이터 확인
  if (!Array.isArray(todoList) || todoList.length === 0) {
    return <div>데이터가 없습니다</div>;
  }

  // 생성일을 기준으로 정렬
  const sortedTodoList = todoList.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  );

  return (
    <ListBox>
      <div className="title">
        <h1>오늘의 할일</h1>
        <p className="date">{getCurrentDate()}</p>
      </div>
      <ul>
        {sortedTodoList.map((todo) => (
          <li
            key={todo.gid}
            onClick={() => onToggle(todo)}
            className={todo.agree ? 'checked' : ''}
          >
            {todo.agree ? <GrCheckboxSelected /> : <GrCheckbox />}
            <span className="content">{todo.content}</span>
          </li>
        ))}
      </ul>
    </ListBox>
  );
};

export default TodoList;
