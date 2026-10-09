import { ComponentType } from 'react';
import { HtmlType, InputProps } from '../types';
import styles from './styles';
import { useFormContext } from '../FormContext';
import TextInput from './TextInput';
import EmailInput from './EmailInput';
import Checkbox from './Checkbox';
import Telephone from './Telephone';
import TextArea from './TextArea';
import File from './File';
import RadioButton from './RadioButton';
import CheckboxGroup from './CheckboxGroup';

const FormComponents: Record<string, ComponentType<InputProps>> = {
  text: TextInput,
  email: EmailInput,
  checkbox: Checkbox,
  phone: Telephone,
  textarea: TextArea,
  file: File,
  radiobutton: RadioButton,
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

  const isCheckboxGroup =
    htmlType === 'checkbox' && Boolean(formState?.[id]?.options?.length);
  const Component = isCheckboxGroup
    ? CheckboxGroup
    : FormComponents?.[htmlType];
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
