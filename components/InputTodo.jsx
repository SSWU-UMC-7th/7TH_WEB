// src/components/InputTodo.js
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {add} from '../redux/todoSlice'
import styled from 'styled-components';

const InputTodoContainer = styled.div`
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
`;

const TextInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 2px solid #ffb2f5;
  border-radius: 20px;
  color: #ffb2f5;
  background: white;
  outline: none;
  font-size: 1em;
  &:focus {
    border-color: #f261df;
  }
`;

const SubmitButton = styled.button`
  margin-left: 10px;
  padding: 10px 15px;
  border: none;
  background: #ffb2f5;
  color: white;
  font-size: 1.2em;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background: #f261df;
  }
`;

export default function InputTodo() {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const handleTextChange = (e) => setText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === '') {
      alert('할 일을 입력해주세요!');
      return;
    }
    dispatch(add(text));
    setText('');
  };

  return (
    <InputTodoContainer>
      <Form onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="할 일 입력"
          value={text}
          onChange={handleTextChange}
        />
        <SubmitButton type="submit">+</SubmitButton>
      </Form>
    </InputTodoContainer>
  );
}