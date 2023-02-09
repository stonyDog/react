import { useState } from 'react';

function AddTodo({ setTodos_ }) {
  const [task, setTask] = useState('');

  const handleNewTask = (event) => {
    setTask(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (task === '') return;
    setTodos_((todos) => [...todos, { task, isCompleted: false }]);
    setTask('');
  };

  return (
    <form onSubmit={handleSubmit}>
      Add Task :
      <input value={task} placeholder="Add New Task" onChange={handleNewTask} />
    </form>
  );
};

export default AddTodo;