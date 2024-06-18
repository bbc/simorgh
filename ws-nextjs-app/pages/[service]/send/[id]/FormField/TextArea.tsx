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
  const hasWordLimit = !!wordLimit;
  const translation = `Maximum ${wordLimit} Words`; // hardcoded
  const describedByWordLimit = `${id}-wordLimit`;

  return (
    <>
      <Label forId={id} required={required}>{label}</Label>
      {hasWordLimit && (
        <Paragraph
          css={{ marginBottom: `${pixelsToRem(6)}rem` }}
          fontVariant="sansRegular"
          size="brevier"
          id={describedByWordLimit}
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
        {...(hasWordLimit && { 'aria-describedby': describedByWordLimit })}
        {...(!hasAttemptedSubmit && { 'aria-invalid': 'false' })}
        {...(hasAttemptedSubmit && {
          ...(wasInvalid && { 'aria-invalid': !isValid }),
          ...(required && !isValid && { 'aria-required': required }),
          ...(!isValid && {
            'aria-describedby':
              describedBy + (hasWordLimit ? `, ${describedByWordLimit}` : ''),
          }),
        })}
        rows={4}
      />
    </>
  );
};
