// src/components/TodoList.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { remove, complete } from '../redux/todoSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const TodoListContainer = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const TodoItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const TodoText = styled.span`
  flex-grow: 1;
  color: #d1b2ff;
  ${(props) => props.completed && 'text-decoration: line-through; color: #888;'}
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ffd9fa;
  cursor: pointer;
  font-size: 1.2em;
  &:hover {
    color: #c0392b;
  }
`;

export default function TodoList() {
  const todos = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  return (
    <TodoListContainer>
      {todos.map((todo) => (
        <TodoItem key={todo.id}>
          <Checkbox
            type="checkbox"
            checked={todo.complete}
            onChange={() => dispatch(complete(todo.id))}
          />
          <TodoText completed={todo.complete}>{todo.text}</TodoText>
          <DeleteButton onClick={() => dispatch(remove(todo.id))}>
            <FontAwesomeIcon icon={faTrashCan} />
          </DeleteButton>
        </TodoItem>
      ))}
    </TodoListContainer>
  );
}