/** @jsx jsx */
import { jsx } from '@emotion/react';
import Paragraph from '#app/components/Paragraph';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { useContext } from 'react';
import { InputProps } from '../types';
import Label from './FieldLabel';
import styles from './styles';
import InvalidMessageBox from '../MessageBox/InvalidMessageBox';
import fallbackTranslations from '../fallbackTranslations';

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
    translations: {
      ugc: {
        validationWordLimit = fallbackTranslations.validationWordLimit,
      } = {},
    },
  } = useContext(ServiceContext);

  const {
    isValid,
    value = '',
    required,
    wasInvalid,
    wordLimit,
    messageCode,
  } = inputState ?? {};
  const hasWordLimit = !!wordLimit;
  const describedByWordLimit = `${id}-wordLimit`;
  const useErrorTheme = hasAttemptedSubmit && !isValid;
  const labelId = `label-${id}`;
  const errorBoxId = `${id}-error`;

  return (
    <>
      <Label
        forId={id}
        id={labelId}
        required={required}
        useErrorTheme={useErrorTheme}
        labelText={label}
      />
      {hasWordLimit && (
        <Paragraph
          css={[
            styles.maxWordLabel,
            useErrorTheme && styles.erroredMaxWordLabel,
          ]}
          fontVariant="sansRegular"
          size="brevier"
          id={describedByWordLimit}
        >
          {validationWordLimit.replaceAll(
            '{{wordLimit}}',
            wordLimit?.toString(),
          )}
        </Paragraph>
      )}
      <textarea
        id={id}
        css={[
          styles.textField,
          styles.textArea,
          styles.focusIndicatorInput,
          useErrorTheme && styles.textFieldError,
          !value && styles.overflowOverride,
        ]}
        name={name}
        value={value as string}
        onChange={e => handleChange(e.target.name, e.target.value)}
        onBlur={e => handleFocusOut(e.target.name)}
        {...(hasWordLimit && { 'aria-describedby': describedByWordLimit })}
        {...(!hasAttemptedSubmit && { 'aria-invalid': 'false' })}
        {...(hasAttemptedSubmit && {
          ...(wasInvalid && { 'aria-invalid': !isValid }),
          ...(required && !isValid && { 'aria-required': required }),
          ...(!isValid && {
            'aria-describedby':
              errorBoxId + (hasWordLimit ? ` ${describedByWordLimit}` : ''),
          }),
        })}
        rows={4}
      />
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
