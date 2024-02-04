import React from 'react';
import styled from 'styled-components';
import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { PiPlusBold } from 'react-icons/pi';
import sizeNames from '../../styles/sizes';
import { AddTodoButton } from '../commons/ButtonStyle';
import { useTranslation } from 'react-i18next';
import loadable from '@loadable/component';
import { InputText } from '../commons/InputStyle';
import { FiMinusCircle } from 'react-icons/fi';

const { medium, big } = sizeNames;

const ErrorMessages = loadable(() => import('../commons/ErrorMessages'));

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

  .minusbtn {
    margin-left: auto;
    margin-right: 15px;
  }
  .content {
    margin-left: 15px;
    font-size: ${medium};
  }

  .todo {
    color: #fff;
    font-size: ${medium};
  }

  svg {
    margin-left: 5px;
    font-size: ${medium};
  }
  .plustodo {
    display: flex;
  }

  .btn {
    margin-left: 5px;
  }
  .no_data {
    background: #f54a39;
    color: #fff;
    display: inline-block;
    padding: 3px 15px;
    border-radius: 5px;
    font-size: ${medium};
  }
`;

const TodoList = ({
  todoList,
  handleFormSubmit,
  errors,
  handleInputChange,
  form,
  onToggle,
  handleDelete,
}) => {
  const { t } = useTranslation();

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <ListBox>
      <div className="title">
        <h1>오늘의 할일</h1>
        <p className="date">
          <FaRegCalendarAlt />
          {getCurrentDate()}
        </p>
      </div>
      <div>
        <div className="plustodo">
          <dd>
            <InputText
              className="input"
              name="content"
              defaultValue={(form && form.content) || ''}
              onChange={handleInputChange}
            />
            <ErrorMessages errors={errors} field="content" />
          </dd>

          <AddTodoButton
            type="submit"
            onClick={handleFormSubmit}
            className="btn"
          >
            <PiPlusBold />
            <p className="todo">할 일 추가하기</p>
          </AddTodoButton>
        </div>
        <ul>
          {/* 할일 목록을 순회하고 각 할일을 표시합니다. */}
          {todoList && todoList.length > 0 ? (
            todoList.map((todo) => (
              <li
                key={todo.gid}
                onClick={() => onToggle(todo)} // 클릭 이벤트 연결
                className={todo.done ? 'checked' : ''}
              >
                {/* 완료된 할일인지 여부에 따라 아이콘을 표시합니다. */}
                {todo.done ? <GrCheckboxSelected /> : <GrCheckbox />}
                <span className="content">{todo.content}</span>
                <FiMinusCircle
                  className="minusbtn"
                  onClick={async (e) => {
                    console.log('할 일 삭제 호출 전:', todo.seq);
                    await handleDelete(todo);
                  }}
                />
              </li>
            ))
          ) : (
            <div key="no_data" className="no_data">
              할 일을 추가하세요
            </div>
          )}
        </ul>
      </div>
    </ListBox>
  );
};

export default React.memo(TodoList);
