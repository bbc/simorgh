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

const TextInput = ({ id, name, handleChange, inputState }: InputProps) => {
  return (
    <input
      id={id}
      name={name}
      type="text"
      value={(inputState.value as string) ?? ''}
      onChange={e => handleChange(e.target.name, e.target.value)}
    />
  );
};

const TextArea = ({ id, name, handleChange, inputState }: InputProps) => {
  return (
    <textarea
      id={id}
      name={name}
      value={(inputState.value as string) ?? ''}
      onChange={e => handleChange(e.target.name, e.target.value)}
    />
  );
};

const EmailInput = ({ id, name, handleChange, inputState }: InputProps) => {
  return (
    <input
      id={id}
      name={name}
      type="email"
      value={(inputState.value as string) ?? ''}
      onChange={e => handleChange(e.target.name, e.target.value)}
    />
  );
};

const Checkbox = ({ id, name, handleChange, inputState }: InputProps) => {
  return (
    <input
      id={id}
      name={name}
      type="checkbox"
      checked={(inputState.value as boolean) ?? false}
      onChange={e => handleChange(e.target.name, e.target.checked)}
    />
  );
};

const Telephone = ({ id, name, handleChange, inputState }: InputProps) => {
  return (
    <input
      id={id}
      name={name}
      type="tel"
      value={(inputState.value as string) ?? ''}
      onChange={e => handleChange(e.target.name, e.target.value)}
    />
  );
};

const File = ({ id, name, handleChange }: InputProps) => {
  return (
    <input
      id={id}
      name={name}
      type="file"
      onChange={e =>
        e.target.files && handleChange(e.target.name, e.target.files)
      }
    />
  );
};

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
  const { handleChange, formState } = useFormContext();

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
      <Component
        id={id}
        name={id}
        handleChange={handleChange}
        inputState={formState?.[id]}
      />
      <p>YOU`&apos;`VE MISSED THIS FIELD</p>
    </div>
  );
};

export default FormField;
