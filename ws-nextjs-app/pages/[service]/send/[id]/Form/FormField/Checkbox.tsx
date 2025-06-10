/** @jsx jsx */
import { jsx } from '@emotion/react';
import { InputProps } from '../../types';
import Label from './FieldLabel';
import styles from './styles';
import InvalidMessageBox from '../../MessageBox/InvalidMessageBox';

export default ({
  id,
  name,
  handleChange,
  handleFocusOut,
  inputState,
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
  const errorBoxId = `${id}-error`;

  return (
    <>
      <div css={[styles.checkboxContainer]}>
        <input
          css={[
            styles.checkbox,
            styles.focusIndicatorInput,
            useErrorTheme && styles.checkboxError,
          ]}
          id={id}
          name={name}
          type="checkbox"
          checked={value as boolean}
          onChange={e => handleChange(e.target.name, e.target.checked)}
          onBlur={e => handleFocusOut(e.target.name)}
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
          labelText={label}
        />
      </div>
      {hasAttemptedSubmit && !isValid && (
        <InvalidMessageBox
          id={errorBoxId}
          messageCode={messageCode}
          suffix={label}
        />
      )}
    </>
  );
};
