import React from 'react';
import { InputProps } from '../types';

export default ({
  id,
  name,
  handleChange,
  inputState,
  describedBy,
}: InputProps) => {
  const { isValid, required } = inputState;
  return (
    <input
      id={id}
      name={name}
      type="file"
      onChange={e =>
        e.target.files && handleChange(e.target.name, e.target.files)
      }
      multiple
      aria-invalid={!isValid}
      aria-required={required}
      aria-describedby={describedBy}
    />
  );
};
