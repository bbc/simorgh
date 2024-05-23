/** @jsx jsx */
import { jsx } from '@emotion/react';
import { ReactElement } from 'react';
import { HtmlType, InputProps } from '../types';
import styles from './styles';
import { useFormContext } from '../FormContext';
import TextInput from './TextInput';
import EmailInput from './EmailInput';
import Checkbox from './Checkbox';
import Telephone from './Telephone';
import TextArea from './TextArea';
import File from './File';
import InvalidMessageBox from './InvalidMessageBox';

const FormComponents: Record<
  string,
  ({ id, name }: InputProps) => ReactElement
> = {
  text: TextInput,
  email: EmailInput,
  checkbox: Checkbox,
  phone: Telephone,
  textarea: TextArea,
  file: File,
};

export type FormComponentProps = {
  id: string;
  htmlType: HtmlType;
  label: string;
  validation?: {
    wordLimit?: number;
  };
};

const FormField = ({ id, htmlType, label, validation }: FormComponentProps) => {
  const { handleChange, formState, hasAttemptedSubmit } = useFormContext();

  const Component = FormComponents?.[htmlType];
  if (!Component) return null;

  const { wordLimit } = validation ?? {};
  const { isValid, messageCode } = formState?.[id] ?? {};
  const ariaErrorDescribedById = `${id}-error`;

  // As part of GEL guidelines, we should show the invalid message only after the initial submit.
  return (
    <div css={styles.formField}>
      <Component
        label={label}
        id={id}
        name={id}
        handleChange={handleChange}
        inputState={formState?.[id]}
        describedBy={ariaErrorDescribedById}
        hasAttemptedSubmit={hasAttemptedSubmit}
        wordLimit={wordLimit}
      />
      {hasAttemptedSubmit && !isValid && (
        <InvalidMessageBox
          id={ariaErrorDescribedById}
          messageCode={messageCode}
        />
      )}
    </div>
  );
};

export default FormField;
