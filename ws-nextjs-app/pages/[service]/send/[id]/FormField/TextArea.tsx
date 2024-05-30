/** @jsx jsx */
import { jsx } from '@emotion/react';
import Paragraph from '#app/components/Paragraph';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { InputProps } from '../types';
import styles from './styles';

export default ({
  id,
  name,
  handleChange,
  inputState,
  describedBy,
<<<<<<< HEAD
=======
  label,
  hasAttemptedSubmit,
>>>>>>> da4dfcf1a4cfd102bce99fc21e42d0f83205dfe5
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
<<<<<<< HEAD
    <textarea
      id={id}
      css={[styles.textField, styles.textArea, styles.focusIndicator]}
      name={name}
      value={value as string}
      onChange={e => handleChange(e.target.name, e.target.value)}
      aria-invalid={!isValid}
      aria-required={required}
      aria-describedby={describedBy}
      rows={4}
    />
=======
    <>
      <Label id={id}>{label}</Label>
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
        {...(hasAttemptedSubmit && {
          ...(wasInvalid && { 'aria-invalid': !isValid }),
          ...(required && { 'aria-required': required }),
          ...(!isValid && {
            'aria-describedby':
              describedBy + (hasWordLimit ? `, ${describedByWordLimit}` : ''),
          }),
        })}
        rows={4}
      />
    </>
>>>>>>> da4dfcf1a4cfd102bce99fc21e42d0f83205dfe5
  );
};
