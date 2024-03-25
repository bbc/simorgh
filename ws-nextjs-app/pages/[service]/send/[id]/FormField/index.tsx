/** @jsx jsx */
import { jsx } from '@emotion/react';
import { PropsWithChildren, ReactElement } from 'react';
import { FormComponentProps, InputProps } from '../types';
import styles from '../styles';

const Label = ({ id, children }: PropsWithChildren<{ id: string }>) => (
  <label htmlFor={id}>{children}</label>
);

const TextInput = ({ id, name }: InputProps) => (
  <input id={id} name={name} type="text" />
);

const TextArea = ({ id, name }: InputProps) => <textarea id={id} name={name} />;

const EmailInput = ({ id, name }: InputProps) => (
  <input id={id} name={name} type="email" />
);

const Checkbox = ({ id, name }: InputProps) => (
  <input id={id} name={name} type="checkbox" />
);

const Telephone = ({ id, name }: InputProps) => (
  <input id={id} name={name} type="tel" />
);

const File = ({ id, name }: InputProps) => (
  <input id={id} name={name} type="file" />
);

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

const FormField = ({ id, htmlType, label }: FormComponentProps) => {
  const Component = FormComponents[htmlType];

  if (!Component) return null;

  return (
    <div css={styles.formField}>
      <Label id={id}>{label}</Label>
      <Component id={id} name={label} />
    </div>
  );
};

export default FormField;
