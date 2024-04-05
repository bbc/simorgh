import React from 'react';
import ThemeProvider from '#app/components/ThemeProvider';
import mundoFormFixture from '#data/mundo/send/test2qq3x8vt.json';
import { NextRouter } from 'next/router';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import FormField, { FormComponentProps } from '.';
import { FormContextProvider } from '../FormContext';
import { Field } from '../types';

const fieldsData = mundoFormFixture.sections[0].fields as Field[];

const Component = ({ id, label, htmlType }: FormComponentProps) => (
  <RouterContext.Provider
    value={{ query: { id: '123' } } as unknown as NextRouter}
  >
    <ThemeProvider service="pidgin">
      <FormContextProvider fields={fieldsData}>
        <FormField id={id} htmlType={htmlType} label={label} />
      </FormContextProvider>
    </ThemeProvider>
  </RouterContext.Provider>
);

export default {
  title: 'Components/FormFields',
  Component,
};

export const Text = () => (
  <Component id={fieldsData[0].id} htmlType="text" label="Full Name:" />
);

export const TextArea = () => (
  <Component id={fieldsData[4].id} htmlType="textarea" label="Comment:" />
);

export const EMail = () => (
  <Component id={fieldsData[1].id} htmlType="email" label="Email:" />
);

export const Checkbox = () => (
  <Component id={fieldsData[5].id} htmlType="checkbox" label="Consent:" />
);

export const Phone = () => (
  <Component id={fieldsData[3].id} htmlType="phone" label="Tel:" />
);
