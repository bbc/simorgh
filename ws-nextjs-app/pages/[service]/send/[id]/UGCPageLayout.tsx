import React, { FormEvent, PropsWithChildren, ReactElement } from 'react';
import { InputProps } from './types';

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
const Submit = () => <input type="submit" />;

const FormComponents: Record<
  string,
  ({ id, name }: InputProps) => ReactElement
> = {
  text: TextInput,
  email: EmailInput,
  checkbox: Checkbox,
  phone: Telephone,
  textarea: TextArea,
};

const makeForm = ({ id, htmlType, label }: any) => {
  const Component = FormComponents[htmlType];

  if (!Component) return null;

  return (
    <div>
      <Label id={id}>{label}</Label>
      <Component id={id} name={label} />
    </div>
  );
};

const handleSubmit = (event: FormEvent) => {
  event.preventDefault();
};

const UGCPageLayout = ({ pageData }: { pageData: any }) => {
  const {
    data: { sections },
  } = pageData;

  const firstSection = sections[0];

  return (
    <div>
      <h1>Hello</h1>
      <form onSubmit={handleSubmit}>
        {firstSection.fields.map(makeForm)}
        <Submit />
      </form>
    </div>
  );
};

export default UGCPageLayout;
