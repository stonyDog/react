// src/components/CalendarBoard.tsx
import React, { useState, useEffect } from 'react';
import CalendarElement from './CalendarElement';

//CalendarBoardでReact関数コンポーネント宣言
const CalendarBoard: React.FC = () => {
  
	const [selectedDate, setSelectedDate] = useState(new Date());

  //Array(30).fill(0):長さが30の配列,全要素0
  //配列の各要素を現在の日付からi日後の日付に変換
  //要素は使用しないため"_"にする習慣
  const dates = Array(30).fill(0).map((_, i) => new Date(Date.now() + 86400000 * i));

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

  return (
    <div>
	  {/* dates配列をループ、日付に対応するCalendarElementコンポーネントを生成 */}
      {dates.map((date, index) => (
        <CalendarElement key={index} day={date} handleDateClick={() => setSelectedDate(date)} />
      ))}
    </div>
  );
};

export default CalendarBoard;
