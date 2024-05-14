/** @jsx jsx */
import { jsx } from '@emotion/react';
import { InputProps } from '../types';
import Label from './FieldLabel';
import styles from './styles';

export default ({
  id,
  name,
  handleChange,
  inputState,
  describedBy,
  label,
  submitAttemptCount,
}: InputProps) => {
  const { isValid, value = '', required, wasInvalid } = inputState;
  return (
    <>
      <Label id={id}>{label}</Label>
      <input
        id={id}
        css={[styles.textField, styles.focusIndicator]}
        name={name}
        type="tel"
        value={value as string}
        onChange={e => handleChange(e.target.name, e.target.value)}
        {...(submitAttemptCount > 0 &&
          wasInvalid && { 'aria-invalid': !isValid })}
        {...(submitAttemptCount > 0 &&
          required && { 'aria-required': required })}
        {...(submitAttemptCount > 0 &&
          !isValid && { 'aria-describedby': describedBy })}
      />
    </>
  );
};
