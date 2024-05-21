import React from 'react';
import { InputProps } from '../types';
import Label from './FieldLabel';

export default ({
  id,
  name,
  handleChange,
  inputState,
  describedBy,
  label,
}: InputProps) => {
  const { isValid, required } = inputState ?? {};
  return (
    <>
      <Label id={id}>{label}</Label>
      <div>
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
      </div>
    </>
  );
};
