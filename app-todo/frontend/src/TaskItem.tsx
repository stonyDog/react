// TaskItem.tsx
import React, { useState } from 'react';
import  Task  from './Task';
import { DateInput } from './DateInput';
import { TextInput } from './TextInput';

interface TaskItemProps {
  task: Task;
  toggleComplete: (id: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, title: string, dueDate: Date | null) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, toggleComplete, deleteTask, updateTask }) => {
  //isEditing=true:保存　isEditing=false:編集
  const  [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [dueDate, setDueDate] = useState<Date | null>(task.dueDate);

  //
  const handleEdit = () => {
    //保存時にクリックを実行でtrue
    if (isEditing) {
      updateTask(task.id, title, dueDate);
    }
    //保存/編集切り替え
    setIsEditing(!isEditing);
  };

  return (
    <div>
      {isEditing ? (
        //保存
        <>
          {/* テキスト入力 */}
          <TextInput value={title} onChange={setTitle} />
          {/* 日付入力 */}
          <DateInput value={dueDate} onChange={setDueDate} />
        </>
      ) : (
        // 編集
        <>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleComplete(task.id)}
          />
          {/* オプショナルチェイニング演算子?.です。この演算子は、左辺のオブジェクトがnullまたはundefinedである場合に、エラーを発生させずにundefinedを返す */}
          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.title} - {task.dueDate?.toLocaleDateString()}
          </span>
        </>
      )}

      {/* 保存/編集切り替えボタン　クリックでhandleEditが実行 */}
      <button onClick={handleEdit}  aria-label={isEditing ? 'タスクを保存' : 'タスクを編集'}>
        {isEditing ? '保存' : '編集'}
      </button>
      
      <button onClick={() => deleteTask(task.id)} aria-label="タスクを削除">
        削除
      </button>
      
    </div>
  );
};