// DateInput.tsx
import React from 'react';

interface DateInputProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
}

export const DateInput: React.FC<DateInputProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value ? new Date(e.target.value) : null);
  };

  return (
    <input
      type="date"
      value={value ? value.toISOString().substring(0, 10) : ''}
      onChange={handleChange}
    />
  );
};