// src/components/CalendarBoard.tsx
import React, { useState, useEffect } from 'react';
import CalendarElement from './CalendarElement';

//CalendarBoardでReact関数コンポーネント宣言
const CalendarBoard: React.FC = () => {
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

  const moveMonth = (amount: number) => {
    //prevMonth：1つ前の月の情報
    setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() + amount, 1));
  };
  
  // 今月の最初の日を取得
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  
  // 今月の最初の日の曜日を取得（0:日曜日, 1:月曜日, ..., 6:土曜日）
  const firstDayOfWeek = firstDayOfMonth.getDay();
  
  // 週の最初の日を日曜日に合わせるため、最初の日から曜日の数だけ日を引く
  const startDate = new Date(firstDayOfMonth.setDate(firstDayOfMonth.getDate() - firstDayOfWeek));
  
  // 週ごとに日付を格納するための配列を作成
  const dates = Array.from({ length: 5 }).map((_, i) =>
    Array.from({ length: 7 }).map((_, j) => new Date(new Date(startDate).setDate(startDate.getDate() + 7 * i + j)))
  );

  return (
    <div>
      <button onClick={() => moveMonth(-1)}>前月</button>
      <button onClick={() => moveMonth(1)}>次月</button>
      {dates.map((week, i) =>
        <div key={i}>
          {week.map((date, j) =>
            <CalendarElement key={j} day={date} handleDateClick={() => setSelectedDate(date)} />
          )}
        </div>
      )}
	  {/* dates配列をループ、日付に対応するCalendarElementコンポーネントを生成
      {dates.map((date, index) => (
        <CalendarElement key={index} day={date} handleDateClick={() => setSelectedDate(date)} />
      ))} */}
    </div>
  );
};

export default CalendarBoard;
