import { ReactElement } from 'react';

import { useFormContext } from '../FormContext';
import { HtmlType, InputProps } from '../types';
import Checkbox from './Checkbox';
import EmailInput from './EmailInput';
import File from './File';
import styles from './styles';
import Telephone from './Telephone';
import TextArea from './TextArea';
import TextInput from './TextInput';

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
};

const FormField = ({ id, htmlType, label }: FormComponentProps) => {
  const { handleChange, handleFocusOut, formState, attemptedSubmitCount } =
    useFormContext();

  const hasAttemptedSubmit = attemptedSubmitCount > 0;

  const Component = FormComponents?.[htmlType];
  if (!Component) return null;

  // As part of GEL guidelines, we should show the invalid message only after the initial submit.
  return (
    <div css={styles.formField}>
      <Component
        label={label}
        id={id}
        name={id}
        handleChange={handleChange}
        handleFocusOut={handleFocusOut}
        inputState={formState?.[id]}
        hasAttemptedSubmit={hasAttemptedSubmit}
      />
    </div>
  );
};

export default FormField;
