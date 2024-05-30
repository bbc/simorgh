import React from 'react';
import { InputProps } from '../types';

export default ({
  id,
  name,
  handleChange,
  inputState,
  describedBy,
<<<<<<< HEAD
=======
  label,
  hasAttemptedSubmit,
>>>>>>> da4dfcf1a4cfd102bce99fc21e42d0f83205dfe5
}: InputProps) => {
  const { isValid, value = false, required, wasInvalid } = inputState ?? {};

  return (
<<<<<<< HEAD
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
=======
    <div css={[styles.checkboxContainer]}>
      <input
        css={[styles.checkbox, styles.focusIndicator]}
        id={id}
        name={name}
        type="checkbox"
        checked={value as boolean}
        onChange={e => handleChange(e.target.name, e.target.checked)}
        {...(hasAttemptedSubmit && {
          ...(wasInvalid && { 'aria-invalid': !isValid }),
          ...(!isValid && { 'aria-describedby': describedBy }),
        })}
        {...(required && { 'aria-required': required })}
      />

      <Label id={id} css={[styles.checkboxLabel]}>
        {label}
      </Label>
    </div>
>>>>>>> da4dfcf1a4cfd102bce99fc21e42d0f83205dfe5
  );
};
