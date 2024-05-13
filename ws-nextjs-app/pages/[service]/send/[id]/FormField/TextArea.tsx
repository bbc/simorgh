/** @jsx jsx */
import { jsx } from '@emotion/react';
import { InputProps } from '../types';
import Label from './FieldLabel';
import styles from './styles';

export default ({
  id,
  handleChange,
  label,
  value = '',
  ...props
}: InputProps) => {
  return (
    <>
      <Label id={id}>{label}</Label>
      <textarea
        id={id}
        css={[styles.textField, styles.textArea, styles.focusIndicator]}
        value={value as string}
        onChange={e => handleChange(e.target.name, e.target.value)}
        rows={4}
        {...props}
      />
    </>
  );
};
