import { use } from 'react';
import Text from '#app/components/Text';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { InputProps } from '../types';
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
    isValid,
    value = '',
    required,
    wasInvalid,
    messageCode,
    options = [],
  } = inputState ?? {};
  const {
    translations: { ugc: { optional = fallbackTranslations.optional } = {} },
  } = use(ServiceContext);
  const useErrorTheme = hasAttemptedSubmit && !isValid;
  const errorBoxId = `${id}-error`;

  return (
    <>
      <fieldset
        id={id}
        tabIndex={-1}
        css={styles.radioButtonFieldset}
        {...(hasAttemptedSubmit && {
          ...(wasInvalid && { 'aria-invalid': !isValid }),
          ...(required && !isValid && { 'aria-required': required }),
          ...(!isValid && { 'aria-describedby': errorBoxId }),
        })}
      >
        <Text
          as="legend"
          css={[styles.fieldLabel, useErrorTheme && styles.fieldLabelError]}
          dangerouslySetInnerHTML={{
            __html: required ? label : `${label} (${optional})`,
          }}
        />
        <div css={styles.radioButtonOptions}>
          {options.map((option, index) => {
            const optionId = `${id}-${index}`;

            return (
              <div key={option.value} css={styles.radioButtonContainer}>
                <input
                  css={[
                    styles.radioButton,
                    styles.focusIndicatorInput,
                    useErrorTheme && styles.radioButtonError,
                  ]}
                  id={optionId}
                  name={name}
                  type="radio"
                  value={option.value}
                  checked={value === option.value}
                  onChange={event =>
                    handleChange(event.target.name, event.target.value)
                  }
                  onBlur={event => handleFocusOut(event.target.name)}
                />
                <Text
                  as="label"
                  htmlFor={optionId}
                  css={styles.radioButtonLabel}
                  dangerouslySetInnerHTML={{ __html: option.label }}
                />
              </div>
            );
          })}
        </div>
      </fieldset>
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
