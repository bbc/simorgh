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
  const {
    isValid,
    value = '',
    required,
    wasInvalid,
    wordLimit,
  } = inputState ?? {};
  const hasWordCount = !!wordLimit;
  const translation = `Maximum ${wordLimit} Words`;
  const describedByWordCount = `${id}-wordLimit`;

  return (
    <>
      <Label id={id}>{label}</Label>
      {wordLimit && (
        <Paragraph
          css={{ marginBottom: `${pixelsToRem(6)}rem` }}
          fontVariant="sansRegular"
          size="brevier"
          id={describedByWordCount}
        >
          {translation}
        </Paragraph>
      )}
      <textarea
        id={id}
        css={[styles.textField, styles.textArea, styles.focusIndicator]}
        name={name}
        value={value as string}
        onChange={e => handleChange(e.target.name, e.target.value)}
        {...(hasWordCount && { 'aria-describedby': describedByWordCount })}
        {...(hasAttemptedSubmit && {
          ...(wasInvalid && { 'aria-invalid': !isValid }),
          ...(required && { 'aria-required': required }),
          ...(!isValid && {
            'aria-describedby':
              describedBy + (hasWordCount ? `, ${describedByWordCount}` : ''),
          }),
        })}
        rows={4}
      />
    </>
  );
};
