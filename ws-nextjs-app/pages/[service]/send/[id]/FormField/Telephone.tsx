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
  hasAttemptedSubmit,
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
        {...(hasAttemptedSubmit && {
          ...(wasInvalid && { 'aria-invalid': !isValid }),
          ...(required && { 'aria-required': required }),
          ...(!isValid && { 'aria-describedby': describedBy }),
        })}
      />
    </>
  );
};
