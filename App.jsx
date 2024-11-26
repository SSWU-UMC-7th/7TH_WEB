import React from 'react';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import store from './redux/store';
import TodoList from './components/TodoList';
import InputTodo from './components/InputTodo';

const AppContainer = styled.div`
  width: 450px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  background: #f6f8fa;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2em;
  margin-bottom: 30px;
`;

const DateText = styled.div`
  color: #333;
  font-weight: bold;
`;

const TimeText = styled.div`
  color: #666;
`;

function App() {
  const currentDate = new Date();
  const date = currentDate.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
  const time = currentDate.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <Provider store={store}>
      <AppContainer>
        <Header>
          <DateText>{date}</DateText>
          <TimeText>{time}</TimeText>
        </Header>
        <InputTodo />
        <TodoList />
      </AppContainer>
    </Provider>
  );
}

export default App;
