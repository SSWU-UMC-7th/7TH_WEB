import './App.css';
import { useState } from 'react';


function Button({ onClick, children, className }) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}


function Input({ value, onChange, className }) {
  return (
    <input
      className={className}
      type="text"
      value={value}
      onChange={onChange}
    />
  );
}

function App() {
  const [todos, setTodos] = useState([
    { id: 1, task: '투두 만들어보기' },
    { id: 2, task: '희연 혜원 혜윤 건 찬민' },
  ]);

  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState('');
  const [editText, setEditText] = useState('');

  // 1. 추가하기
  const addTodo = () => {
    setTodos((prev) => [
      ...prev,
      { id: Math.floor(Math.random() * 100) + 2, task: text },
    ]);
    setText('');
  };

  // 2. 삭제하기
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  // 3. 수정하기
  const updateTodo = (id, text) => {
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, task: text } : item))
    );
    setEditingId('');
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className="todo-form">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="todo-input"
        />
        <Button onClick={addTodo} className="todo-button">
          할일등록
        </Button>
      </form>

      <div className="todo-list">
        {todos.map((todo) => (
          <div key={todo.id} className="todo-item">
            {editingId !== todo.id ? (
              <div className="todo-text">
                <p>{todo.id}.</p>
                <p>{todo.task}</p>
              </div>
            ) : (
              <div className="todo-text">
                <p>{todo.id}.</p>
                <Input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="edit-input"
                />
              </div>
            )}
            <Button onClick={() => deleteTodo(todo.id)} className="todo-button">
              삭제하기
            </Button>

            {editingId === todo.id ? (
              <Button
                onClick={() => updateTodo(editingId, editText)}
                className="todo-button"
              >
                수정 완료
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setEditingId(todo.id);
                  setEditText(todo.task);
                }}
                className="todo-button"
              >
                수정 진행
              </Button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;