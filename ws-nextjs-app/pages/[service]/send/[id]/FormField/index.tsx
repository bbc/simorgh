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

const Label = ({
  id,
  children,
}: PropsWithChildren<{ id: InputProps['id'] }>) => (
  <Text as="label" htmlFor={id}>
    {children}
  </Text>
);

const InvalidMessageBox = ({ id, messageCode }: InvalidMessageBoxProps) => {
  const {
    translations: { ugc = {} },
  } = useContext(ServiceContext);

  const message = ugc[messageCode ?? InvalidMessageCodes.FieldRequired];

  return (
    <div>
      <p id={id}>
        <span>❗</span>
        {message}
      </p>
    </div>
  );
};

const TextInput = ({
  id,
  name,
  handleChange,
  inputState,
  describedBy,
}: InputProps) => {
  const { isValid, value = '', required } = inputState;
  return (
    <input
      id={id}
      name={name}
      type="text"
      value={value as string}
      onChange={e => handleChange(e.target.name, e.target.value)}
      aria-invalid={!isValid}
      aria-required={required}
      aria-describedby={describedBy}
    />
  );
};

const TextArea = ({
  id,
  name,
  handleChange,
  inputState,
  describedBy,
}: InputProps) => {
  const { isValid, value = '', required } = inputState;

  return (
    <textarea
      id={id}
      name={name}
      value={value as string}
      onChange={e => handleChange(e.target.name, e.target.value)}
      aria-invalid={!isValid}
      aria-required={required}
      aria-describedby={describedBy}
    />
  );
};

const EmailInput = ({
  id,
  name,
  handleChange,
  inputState,
  describedBy,
}: InputProps) => {
  const { isValid, value = '', required } = inputState;
  return (
    <input
      id={id}
      name={name}
      type="email"
      value={value as string}
      onChange={e => handleChange(e.target.name, e.target.value)}
      aria-invalid={!isValid}
      aria-required={required}
      aria-describedby={describedBy}
    />
  );
};

const Checkbox = ({
  id,
  name,
  handleChange,
  inputState,
  describedBy,
}: InputProps) => {
  const { isValid, value = false, required } = inputState;
  return (
    <input
      id={id}
      name={name}
      type="checkbox"
      checked={value as boolean}
      onChange={e => handleChange(e.target.name, e.target.checked)}
      aria-invalid={!isValid}
      aria-required={required}
      aria-describedby={describedBy}
    />
  );
};

const Telephone = ({
  id,
  name,
  handleChange,
  inputState,
  describedBy,
}: InputProps) => {
  const { isValid, value = '', required } = inputState;
  return (
    <input
      id={id}
      name={name}
      type="tel"
      value={value as string}
      onChange={e => handleChange(e.target.name, e.target.value)}
      aria-invalid={!isValid}
      aria-required={required}
      aria-describedby={describedBy}
    />
  );
};

const File = ({
  id,
  name,
  handleChange,
  inputState,
  describedBy,
}: InputProps) => {
  const { isValid, required } = inputState;
  return (
    <input
      id={id}
      name={name}
      type="file"
      onChange={e =>
        e.target.files && handleChange(e.target.name, e.target.files)
      }
      multiple
      aria-invalid={!isValid}
      aria-required={required}
      aria-describedby={describedBy}
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
  const { isValid, messageCode } = formState[id];
  const ariaErrorDescribedById = `${id}-error`;

  if (!Component) return null;

  return (
    <div css={styles.formField}>
      <Label id={id}>{label}</Label>
      <Component
        id={id}
        name={id}
        handleChange={handleChange}
        inputState={formState[id]}
        describedBy={ariaErrorDescribedById}
      />
      {!isValid && (
        <InvalidMessageBox
          id={ariaErrorDescribedById}
          messageCode={messageCode}
        />
      )}
    </div>
  );
};

export default FormField;
