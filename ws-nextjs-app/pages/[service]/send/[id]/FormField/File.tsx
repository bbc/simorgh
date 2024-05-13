import React from 'react';
import { InputProps } from '../types';
import Label from './FieldLabel';

// Disabled as 'value' is not used in file input types
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default ({ id, handleChange, label, value, ...props }: InputProps) => {
  return (
    <>
      <Label id={id}>{label}</Label>
      <input
        id={id}
        type="file"
        onChange={e =>
          e.target.files && handleChange(e.target.name, e.target.files)
        }
        multiple
        {...props}
      />
    </>
  );
};
