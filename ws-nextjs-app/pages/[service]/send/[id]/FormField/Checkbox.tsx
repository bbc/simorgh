import React from 'react';
import { InputProps } from '../types';

export default ({
  id,
  name,
  handleChange,
  inputState,
  describedBy,
}: InputProps) => {
  const { isValid, value = false, required } = inputState;
  return (
    <input
      id={id}
      name={name}
      type="checkbox"
      checked={value as boolean}
      onChange={e => handleChange(e.target.name, e.target.checked)}
      aria-invalid={!isValid}
      aria-required={required}
      aria-describedby={describedBy}
    />
  );
};
