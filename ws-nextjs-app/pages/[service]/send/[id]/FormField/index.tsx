/** @jsx jsx */
import { jsx } from '@emotion/react';
import { PropsWithChildren, ReactElement } from 'react';
import Text from '#app/components/Text';
import { HtmlType, InputProps } from '../types';
import styles from './styles';
import { useFormContext } from '../FormContext';

const Label = ({
  id,
  children,
}: PropsWithChildren<{ id: InputProps['id'] }>) => (
  <Text as="label" htmlFor={id}>
    {children}
  </Text>
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

const File = ({ id, name, onChange }: InputProps) => (
  <input
    id={id}
    name={name}
    type="file"
    onChange={e => e.target.files && onChange(e.target.name, e.target.files)}
  />
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
  const { handleChange } = useFormContext();

  // TODO: Don't like this but needed atm since 'file' and 'textarea' aren't returned as 'htmlType' from the API
  // should probably do this in back-end
  let derivedHtmlType = htmlType;

  if (textArea) {
    derivedHtmlType = 'textarea';
  }

  if (type === 'file') {
    derivedHtmlType = 'file';
  }

  const Component = FormComponents[derivedHtmlType];

  if (!Component) return null;

  return (
    <div css={styles.formField}>
      <Label id={id}>{label}</Label>
      <Component id={id} name={id} onChange={handleChange} />
    </div>
  );
};

export default FormField;
