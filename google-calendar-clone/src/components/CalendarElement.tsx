// src/components/CalendarElement.tsx

import React from 'react';

//alendarElementPropsインターフェースを定義
interface CalendarElementProps {
  //"day"のDate型プロパティ
  day: Date;
  handleDateClick: () => void;
}

const CalendarElement: React.FC<CalendarElementProps> = ({ day, handleDateClick }) => {
  const date = day.getDate();
  const month = day.getMonth() + 1;

  return (
    <div onClick={handleDateClick}>
      <p>{month}月{date}日</p>
    </div>
  );
};

export default CalendarElement;
