/** @jsx jsx */
import { jsx } from '@emotion/react';
import { InputProps } from '../types';
import styles from './styles';

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
  const { isValid, value = '', required, wasInvalid } = inputState ?? {};

  return (
<<<<<<< HEAD
    <input
      css={[styles.textField, styles.focusIndicator]}
      id={id}
      name={name}
      type="text"
      value={value as string}
      onChange={e => handleChange(e.target.name, e.target.value)}
      aria-invalid={!isValid}
      aria-required={required}
      aria-describedby={describedBy}
    />
=======
    <>
      <Label id={id}>{label}</Label>
      <div>
        <input
          css={[styles.textField, styles.focusIndicator]}
          id={id}
          name={name}
          type="text"
          value={value as string}
          onChange={e => handleChange(e.target.name, e.target.value)}
          {...(hasAttemptedSubmit && {
            ...(wasInvalid && { 'aria-invalid': !isValid }),
            ...(required && { 'aria-required': required }),
            ...(!isValid && { 'aria-describedby': describedBy }),
          })}
        />
      </div>
    </>
>>>>>>> da4dfcf1a4cfd102bce99fc21e42d0f83205dfe5
  );
};
