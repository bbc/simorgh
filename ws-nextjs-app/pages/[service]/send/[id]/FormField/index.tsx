/** @jsx jsx */
import { jsx } from '@emotion/react';
import { forwardRef } from 'react';
import { HtmlType } from '../types';
import styles from './styles';
import { useFormContext } from '../FormContext';
import TextInput from './TextInput';
import EmailInput from './EmailInput';
import Checkbox from './Checkbox';
import Telephone from './Telephone';
import TextArea from './TextArea';
import File from './File';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormComponents: any = {
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

const FormField = forwardRef<HTMLElement, FormComponentProps>(
  ({ id, htmlType, label }, ref?) => {
    const { handleChange, handleFocusOut, formState, hasAttemptedSubmit } =
      useFormContext();

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
          {...(ref && { ref })}
        />
      </div>
    );
  },
);

export default FormField;
