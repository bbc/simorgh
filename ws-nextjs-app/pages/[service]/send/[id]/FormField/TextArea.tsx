/** @jsx jsx */
import { jsx } from '@emotion/react';
import Paragraph from '#app/components/Paragraph';
import pixelsToRem from '#app/utilities/pixelsToRem';
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

  const { isValid, value = '', required, wasInvalid } = inputState ?? {};
  const translation = 'Maximum 500 Words';

  return (
    <>
      <Label id={id}>{label}</Label>
      <Paragraph
        css={{ marginBottom: `${pixelsToRem(6)}rem` }}
        fontVariant="sansRegular"
        size="brevier"
      >
        {translation}
      </Paragraph>
      <textarea
        id={id}
        css={[styles.textField, styles.textArea, styles.focusIndicator]}
        name={name}
        value={value as string}
        onChange={e => handleChange(e.target.name, e.target.value)}
        {...(hasAttemptedSubmit && {
          ...(wasInvalid && { 'aria-invalid': !isValid }),
          ...(required && { 'aria-required': required }),
          ...(!isValid && { 'aria-describedby': describedBy }),
        })}
        rows={4}
      />
    </>
  );
};
