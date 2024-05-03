import React from 'react';
import { InputProps } from '../types';

export default ({
  id,
  name,
  handleChange,
  inputState,
  describedBy,
}: InputProps) => {
  const { isValid, value = '', required } = inputState;
  return (
    <input
      id={id}
      name={name}
      type="tel"
      value={value as string}
      onChange={e => handleChange(e.target.name, e.target.value)}
      aria-invalid={!isValid}
      aria-required={required}
      aria-describedby={describedBy}
    />
  );
};
