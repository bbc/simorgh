/** @jsx jsx */
import { jsx } from '@emotion/react';
import { InputProps } from '../types';
import Label from './FieldLabel';
import styles from './styles';

export default ({
  id,
  handleChange,
  label,
  value = false,
  ...props
}: InputProps) => {
  return (
    <div css={[styles.checkboxContainer]}>
      <input
        id={id}
        css={[styles.checkbox, styles.focusIndicator]}
        type="checkbox"
        checked={value as boolean}
        onChange={e => handleChange(e.target.name, e.target.checked)}
        {...props}
      />
      <Label id={id} css={[styles.checkboxLabel]}>
        {label}
      </Label>
    </div>
  );
};
