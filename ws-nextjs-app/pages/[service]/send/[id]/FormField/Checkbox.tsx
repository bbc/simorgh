/** @jsx jsx */
import { jsx } from '@emotion/react';
import { InputProps } from '../types';
import Label from './FieldLabel';
import styles from './styles';
import InvalidMessageBox from './InvalidMessageBox';

export default ({
  id,
  name,
  handleChange,
  inputState,
  describedBy: errorBoxId,
  label,
  hasAttemptedSubmit,
}: InputProps) => {
  const {
    isValid,
    value = false,
    required,
    wasInvalid,
    messageCode,
  } = inputState ?? {};
  const useErrorTheme = hasAttemptedSubmit && !isValid;
  const labelId = `label-${id}`;

  return (
    <>
      <div css={[styles.checkboxContainer]}>
        <input
          css={[styles.checkbox(useErrorTheme), styles.focusIndicator]}
          id={id}
          name={name}
          type="checkbox"
          checked={value as boolean}
          onChange={e => handleChange(e.target.name, e.target.checked)}
          {...(!hasAttemptedSubmit && { 'aria-invalid': 'false' })}
          {...(hasAttemptedSubmit && {
            ...(wasInvalid && { 'aria-invalid': !isValid }),
            ...(!isValid && { 'aria-describedby': errorBoxId }),
          })}
          {...(required && !isValid && { 'aria-required': required })}
        />
        <Label
          required={required}
          forId={id}
          id={labelId}
          css={[styles.checkboxLabel]}
          useErrorTheme={useErrorTheme}
        >
          {label}
        </Label>
      </div>
      {hasAttemptedSubmit && !isValid && (
        <InvalidMessageBox
          id={errorBoxId}
          messageCode={messageCode}
          describedBy={labelId}
        />
      )}
    </>
  );
};
