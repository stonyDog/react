// useTaskManager.ts
import { useState } from 'react';
import Task from './Task';

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  //tasksに追加する関数(引数：titleとdueData)
  const addTask = (title: string, dueDate: Date | null) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      dueDate,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  //taskのcompletedを更新する関数(引数：id)
  //task.id===idの時のみsetTasksを読みだせばいいのでは
  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  //taskの削除する関数(引数：id)
  //task.id!==idの時のみ配列を取得
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //taskの更新する関数(引数：)
  const updateTask = (id: string, title: string, dueDate: Date | null) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, title, dueDate } : task))
    );
  };

  return { tasks, addTask, toggleComplete, deleteTask, updateTask };
};