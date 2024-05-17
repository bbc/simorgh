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
  type?: string;
  textArea?: boolean;
};

const FormField = ({
  id,
  type,
  htmlType,
  label,
  textArea,
}: FormComponentProps) => {
  // TODO: Don't like this but needed atm since 'file' and 'textarea' aren't returned as 'htmlType' from the API
  // should probably do this in back-end
  let derivedHtmlType = htmlType;
  const { handleChange, formState, hasAttemptedSubmit } = useFormContext();

  if (textArea) {
    derivedHtmlType = 'textarea';
  }

  if (type === 'file') {
    derivedHtmlType = 'file';
  }

  const Component = FormComponents[derivedHtmlType];
  const { isValid, messageCode } = formState[id];
  const ariaErrorDescribedById = `${id}-error`;

  if (!Component) return null;

  // As part of GEL guidelines, we should show the invalid message only after the initial submit.
  return (
    <div css={styles.formField}>
      <Component
        label={label}
        id={id}
        name={id}
        handleChange={handleChange}
        inputState={formState[id]}
        describedBy={ariaErrorDescribedById}
        hasAttemptedSubmit={hasAttemptedSubmit}
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
