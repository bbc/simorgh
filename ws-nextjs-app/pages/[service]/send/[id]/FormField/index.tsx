/** @jsx jsx */
import { jsx } from '@emotion/react';
import { PropsWithChildren, ReactElement } from 'react';
import { HtmlType, InputProps, OnChangeHandler } from '../types';
import styles from '../styles';

const Label = ({ id, children }: PropsWithChildren<{ id: string }>) => (
  <label htmlFor={id}>{children}</label>
);

const TextInput = ({ id, name, onChange }: InputProps) => (
  <input
    id={id}
    name={name}
    type="text"
    onChange={e => onChange(e.target.name, e.target.value)}
  />
);

const TextArea = ({ id, name, onChange }: InputProps) => (
  <textarea
    id={id}
    name={name}
    onChange={e => onChange(e.target.name, e.target.value)}
  />
);

const EmailInput = ({ id, name, onChange }: InputProps) => (
  <input
    id={id}
    name={name}
    type="email"
    onChange={e => onChange(e.target.name, e.target.value)}
  />
);

const Checkbox = ({ id, name, onChange }: InputProps) => (
  <input
    id={id}
    name={name}
    type="checkbox"
    onChange={e => onChange(e.target.name, e.target.checked)}
  />
);

const Telephone = ({ id, name, onChange }: InputProps) => (
  <input
    id={id}
    name={name}
    type="tel"
    onChange={e => onChange(e.target.name, e.target.value)}
  />
);

const File = ({ id, name }: InputProps) => (
  <input id={id} name={name} type="file" />
);

const FormComponents: Record<
  string,
  ({ id, name, onChange }: InputProps) => ReactElement
> = {
  text: TextInput,
  email: EmailInput,
  checkbox: Checkbox,
  phone: Telephone,
  textarea: TextArea,
  file: File,
};

type FormComponentProps = {
  id: string;
  htmlType: HtmlType;
  label: string;
  onChange: OnChangeHandler;
};

const FormField = ({ id, htmlType, label, onChange }: FormComponentProps) => {
  const Component = FormComponents[htmlType];

  if (!Component) return null;

  return (
    <div css={styles.formField}>
      <Label id={id}>{label}</Label>
      <Component id={id} name={id} onChange={onChange} />
    </div>
  );
};

export default FormField;
