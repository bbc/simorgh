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
  const { isValid, value = false, required, wasInvalid } = inputState;

  return (
    <div css={[styles.checkboxContainer]}>
      <input
        css={[styles.checkbox, styles.focusIndicator]}
        id={id}
        name={name}
        type="checkbox"
        checked={value as boolean}
        onChange={e => handleChange(e.target.name, e.target.checked)}
        {...(submitAttemptCount > 0 &&
          wasInvalid && { 'aria-invalid': !isValid })}
        {...(required && { 'aria-required': required })}
        {...(submitAttemptCount > 0 &&
          !isValid && { 'aria-describedby': describedBy })}
      />
      <Label id={id} css={[styles.checkboxLabel]}>
        {label}
      </Label>
    </div>
  );
};
