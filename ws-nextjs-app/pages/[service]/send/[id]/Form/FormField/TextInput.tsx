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
    value = '',
    required,
    wasInvalid,
    messageCode,
  } = inputState ?? {};
  const useErrorTheme = hasAttemptedSubmit && !isValid;
  const labelId = `label-${id}`;
  const errorBoxId = `${id}-error`;

  return (
    <>
      <Label
        required={required}
        id={labelId}
        forId={id}
        useErrorTheme={useErrorTheme}
        labelText={label}
      />
      <div>
        <input
          css={[
            styles.textField,
            styles.focusIndicatorInput,
            useErrorTheme && styles.textFieldError,
          ]}
          id={id}
          name={name}
          type="text"
          value={value as string}
          onChange={e => handleChange(e.target.name, e.target.value)}
          onBlur={e => handleFocusOut(e.target.name)}
          {...(!hasAttemptedSubmit && { 'aria-invalid': 'false' })}
          {...(hasAttemptedSubmit && {
            ...(wasInvalid && { 'aria-invalid': !isValid }),
            ...(required && !isValid && { 'aria-required': required }),
            ...(!isValid && { 'aria-describedby': errorBoxId }),
          })}
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
