import React from 'react';

function TodoList ({ todos_, setTodos_ }) {
  const handleRemoveTask = (index) => {
    const newTodos = [...todos_];
    newTodos.splice(index, 1);
    setTodos_(newTodos);
  };

  const handleUpdateTask = (index) => {
    const newTodos = todos_.map((todo, todoIndex) => {
      if (todoIndex === index) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    setTodos_(newTodos);
  };

  return (
    <ul>
      {todos_.map((todo, index) => (
        <li
          key={index}
          style={{
            textDecoration: todo.isCompleted ? 'line-through' : 'none',
          }}
        >
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => handleUpdateTask(index)}
          />
          {todo.task}
          <span
            onClick={() => handleRemoveTask(index)}
            style={{ cursor: 'pointer' }}
          >
            X
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;