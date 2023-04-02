// App.tsx
import React from 'react';
import { TaskInput } from './TaskInput';
import { TaskItem } from './TaskItem';
import { useTaskManager } from './useTaskManager';

export const App: React.FC = () => {
  const { tasks, addTask, toggleComplete, deleteTask, updateTask } = useTaskManager();
  
  return (
    <div>
      <h1>ToDoリストアプリ</h1>
      <TaskInput addTask={addTask} />
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskItem
              task={task}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};