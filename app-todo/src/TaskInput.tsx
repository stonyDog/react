// TaskInput.tsx
import React, { useState } from 'react';
import  {DateInput}  from './DateInput';
import { TextInput } from './TextInput';

//
interface TaskInputProps {
  addTask: (title: string, dueDate: Date | null) => void;
}

export const TaskInput: React.FC<TaskInputProps> = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  
  //event型、まとめは下記
  //https://masanyon.com/react-typescript-input-form-event-type/#ReactTypeScriptinputEventSample
  const handleSubmit = (e: React.FormEvent) => {
    //デフォルトのイベント処理をキャンセル
    e.preventDefault();
    //trim:文字列から先頭と末尾の空白を取り除いた新しい文字列を返す
    if (title.trim()) {
      //App.tsxから受け取ったaddTask関数を実行
      addTask(title, dueDate);
      //入力完了後、受け付けた入力を削除
      setTitle('');
      setDueDate(null);
    }
  };

  return (
    //
    <form onSubmit={handleSubmit}>
      {/* テキスト入力 */}
      <TextInput
        value={title}
        onChange={setTitle}
        placeholder="タスク名"
      />
      {/* 日付入力 */}
      <DateInput 
        value={dueDate} 
        onChange={setDueDate} 
      />

      <button type="submit">追加</button>
    </form>
  );
};