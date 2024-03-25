import React from 'react';
import { useFormContext } from './FormContext';
import { Field } from './types';
import FormField from './FormField';

export default function Form({ fields }: { fields: Field[] }) {
  const { handleSubmit } = useFormContext();

  const formFields = fields?.map(({ id, label, htmlType }) => (
    <FormField key={id} id={id} label={label} htmlType={htmlType} />
  ));

  return (
    <form onSubmit={handleSubmit}>
      {formFields}
      <input type="submit" />
    </form>
  );
}
