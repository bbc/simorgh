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
  const { isValid, value = false, required, wasInvalid } = inputState ?? {};

  return (
    <div css={[styles.checkboxContainer]}>
      <input
        css={[styles.checkbox, styles.focusIndicator]}
        id={id}
        name={name}
        type="checkbox"
        checked={value as boolean}
        onChange={e => handleChange(e.target.name, e.target.checked)}
        {...(!hasAttemptedSubmit && { 'aria-invalid': 'false' })}
        {...(hasAttemptedSubmit && {
          ...(wasInvalid && { 'aria-invalid': !isValid }),
          ...(!isValid && { 'aria-describedby': describedBy }),
        })}
        {...(required && !isValid && { 'aria-required': required })}
      />
      <Label
        required={required}
        forId={id}
        css={[styles.checkboxLabel]}
        labelText={label}
      />
    </div>
  );
};
