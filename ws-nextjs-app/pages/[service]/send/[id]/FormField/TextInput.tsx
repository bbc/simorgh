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
}: InputProps) => {
  const { isValid, value = '', required } = inputState;
  return (
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
  );
};
