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
    value = [],
    required,
    wasInvalid,
    messageCode,
    options = [],
  } = inputState ?? {};
  const {
    translations: { ugc: { optional = fallbackTranslations.optional } = {} },
  } = use(ServiceContext);
  const selectedValues = value as string[];
  const useErrorTheme = hasAttemptedSubmit && !isValid;
  const errorBoxId = `${id}-error`;

  const updateSelectedValues = (optionValue: string, checked: boolean) => {
    const nextValues = checked
      ? [...selectedValues, optionValue]
      : selectedValues.filter(selectedValue => selectedValue !== optionValue);

    handleChange(name, nextValues);
  };

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
                    styles.checkbox,
                    styles.constrainedListCheckbox,
                    styles.focusIndicatorInput,
                    useErrorTheme && styles.checkboxError,
                  ]}
                  id={optionId}
                  name={name}
                  type="checkbox"
                  value={option.value}
                  checked={selectedValues.includes(option.value)}
                  onChange={event =>
                    updateSelectedValues(option.value, event.target.checked)
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
