/** @jsx jsx */
import { jsx } from '@emotion/react';
import { PropsWithChildren, ReactElement, useContext } from 'react';
import Text from '#app/components/Text';
import { ServiceContext } from '#app/contexts/ServiceContext';
import {
  HtmlType,
  InputProps,
  InvalidMessageCodes,
  InvalidMessageBoxProps,
} from '../types';
import styles from './styles';
import { useFormContext } from '../FormContext';
import formTranslations from '../FormContext/utils/formTranslations';

const Label = ({
  id,
  children,
}: PropsWithChildren<{ id: InputProps['id'] }>) => (
  <Text as="label" htmlFor={id}>
    {children}
  </Text>
);

const InvalidMessageBox = ({ id, messageCode }: InvalidMessageBoxProps) => {
  const { lang } = useContext(ServiceContext);
  const message =
    formTranslations[lang][messageCode ?? InvalidMessageCodes.FieldRequired];

  return (
    <div>
      <p id={id}>
        <span>❗</span>
        {message}
      </p>
    </div>
  );
};

const TextInput = ({ id, name, handleChange, inputState }: InputProps) => {
  const { invalid, value = '', required } = inputState;
  return (
    <input
      id={id}
      name={name}
      type="text"
      value={value as string}
      onChange={e => handleChange(e.target.name, e.target.value)}
      aria-invalid={invalid}
      aria-required={required}
    />
  );
};

const TextArea = ({ id, name, handleChange, inputState }: InputProps) => {
  const { invalid, value = '', required } = inputState;
  return (
    <textarea
      id={id}
      name={name}
      value={value as string}
      onChange={e => handleChange(e.target.name, e.target.value)}
      aria-invalid={invalid}
      aria-required={required}
    />
  );
};

const EmailInput = ({ id, name, handleChange, inputState }: InputProps) => {
  const { invalid, value = '', required } = inputState;
  return (
    <input
      id={id}
      name={name}
      type="email"
      value={value as string}
      onChange={e => handleChange(e.target.name, e.target.value)}
      aria-invalid={invalid}
      aria-required={required}
      formNoValidate
    />
  );
};

const Checkbox = ({ id, name, handleChange, inputState }: InputProps) => {
  const { invalid, value = false, required } = inputState;
  return (
    <input
      id={id}
      name={name}
      type="checkbox"
      checked={value as boolean}
      onChange={e => handleChange(e.target.name, e.target.checked)}
      aria-invalid={invalid}
      aria-required={required}
    />
  );
};

const Telephone = ({ id, name, handleChange, inputState }: InputProps) => {
  const { invalid, value = '', required } = inputState;
  return (
    <input
      id={id}
      name={name}
      type="tel"
      value={value as string}
      onChange={e => handleChange(e.target.name, e.target.value)}
      aria-invalid={invalid}
      aria-required={required}
    />
  );
};

const File = ({ id, name, handleChange, inputState }: InputProps) => {
  const { invalid, required } = inputState;
  return (
    <input
      id={id}
      name={name}
      type="file"
      onChange={e =>
        e.target.files && handleChange(e.target.name, e.target.files)
      }
      aria-invalid={invalid}
      aria-required={required}
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
  const { invalid, messageCode } = formState[id];
  const ariaErrorDesccribedById = `${id}-error`;

  if (!Component) return null;

  return (
    <div css={styles.formField}>
      <Label id={id}>{label}</Label>
      <Component
        id={id}
        name={id}
        handleChange={handleChange}
        inputState={formState[id]}
      />
      {invalid && (
        <InvalidMessageBox
          id={ariaErrorDesccribedById}
          messageCode={messageCode}
        />
      )}
    </div>
  );
};

export default FormField;
