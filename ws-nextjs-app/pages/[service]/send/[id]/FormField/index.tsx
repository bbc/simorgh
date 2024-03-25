/** @jsx jsx */
import { jsx } from '@emotion/react';
import { PropsWithChildren, ReactElement } from 'react';
import { HtmlType, InputProps } from '../types';
import styles from '../styles';
import { useFormContext } from '../FormContext';

const Label = ({ id, children }: PropsWithChildren<{ id: string }>) => (
  <label htmlFor={id}>{children}</label>
);

const TextInput = ({ id, name }: InputProps) => {
  const { handleChange } = useFormContext();

  return (
    <input
      id={id}
      name={name}
      type="text"
      onChange={e => handleChange(e.target.name, e.target.value)}
    />
  );
};

const TextArea = ({ id, name }: InputProps) => {
  const { handleChange } = useFormContext();

  return (
    <textarea
      id={id}
      name={name}
      onChange={e => handleChange(e.target.name, e.target.value)}
    />
  );
};

const EmailInput = ({ id, name }: InputProps) => {
  const { handleChange } = useFormContext();

  return (
    <input
      id={id}
      name={name}
      type="email"
      onChange={e => handleChange(e.target.name, e.target.value)}
    />
  );
};

const Checkbox = ({ id, name }: InputProps) => {
  const { handleChange } = useFormContext();

  return (
    <input
      id={id}
      name={name}
      type="checkbox"
      onChange={e => handleChange(e.target.name, e.target.checked)}
    />
  );
};

const Telephone = ({ id, name }: InputProps) => {
  const { handleChange } = useFormContext();

  return (
    <input
      id={id}
      name={name}
      type="tel"
      onChange={e => handleChange(e.target.name, e.target.value)}
    />
  );
};

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

type FormComponentProps = {
  id: string;
  htmlType: HtmlType;
  label: string;
};

const FormField = ({ id, htmlType, label }: FormComponentProps) => {
  const Component = FormComponents[htmlType];

  if (!Component) return null;

  return (
    <div css={styles.formField}>
      <Label id={id}>{label}</Label>
      <Component id={id} name={id} />
    </div>
  );
};

export default FormField;
