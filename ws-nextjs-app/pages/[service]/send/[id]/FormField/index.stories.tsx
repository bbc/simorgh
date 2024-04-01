import React from 'react';
import FormField, { FormComponentProps } from '.';

const Component = ({ id, label, htmlType }: FormComponentProps) => (
  <FormField id={id} htmlType={htmlType} label={label} />
);

export default {
  title: 'Components/FormFields',
  Component,
};

export const Text = () => (
  <Component id="exampleText" htmlType="text" label="Full Name:" />
);

export const TextArea = () => (
  <Component id="exampleTextArea" htmlType="textarea" label="Comment:" />
);

export const EMail = () => (
  <Component id="exampleEmail" htmlType="email" label="Email:" />
);

export const Checkbox = () => (
  <Component id="exampleCheckbox" htmlType="checkbox" label="Consent:" />
);

export const Phone = () => (
  <Component id="examplePhone" htmlType="phone" label="Tel:" />
);

export const File = () => (
  <Component id="examplePhone" htmlType="file" label="Upload your file:" />
);
