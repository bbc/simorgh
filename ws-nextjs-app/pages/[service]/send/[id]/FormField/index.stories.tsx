import ThemeProvider from '#app/components/ThemeProvider';
import mundoFormFixture from '#data/mundo/send/test2qq3x8vt.json';
import somaliFormFixture from '#data/somali/send/u130092370.json';
import swahiliFormFixture from '#data/swahili/send/u244742000.json';
import { NextRouter } from 'next/router';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import FormField, { FormComponentProps } from '.';
import { FormContextProvider } from '../FormContext';
import { Field } from '../types';

const fieldsData1 = mundoFormFixture.data.sections[0].fields as Field[];
const fieldsData2 = somaliFormFixture.data.sections[0].fields as Field[];
const fieldsData3 = swahiliFormFixture.data.sections[1].fields as Field[];
const fieldsData4 = swahiliFormFixture.data.sections[4].fields as Field[];
interface FormComponentPropsStorybook extends FormComponentProps {
  fieldsData: Field[];
}

const Component = ({
  id,
  label,
  htmlType,
  fieldsData,
}: FormComponentPropsStorybook) => (
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
  <Component
    id={fieldsData1[0].id}
    htmlType="text"
    label="Full Name:"
    fieldsData={fieldsData1}
  />
);

export const TextArea = () => (
  <Component
    id={fieldsData1[4].id}
    htmlType="textarea"
    label="Comment:"
    fieldsData={fieldsData1}
  />
);

export const Email = () => (
  <Component
    id={fieldsData1[1].id}
    htmlType="email"
    label="Email:"
    fieldsData={fieldsData1}
  />
);

export const Checkbox = () => (
  <Component
    id={fieldsData1[5].id}
    htmlType="checkbox"
    label="Consent:"
    fieldsData={fieldsData1}
  />
);

export const Phone = () => (
  <Component
    id={fieldsData1[3].id}
    htmlType="phone"
    label="Tel:"
    fieldsData={fieldsData1}
  />
);

export const File = () => (
  <Component
    id={fieldsData2[3].id}
    htmlType="file"
    label="File:"
    fieldsData={fieldsData2}
  />
);

export const RadioButtonList = () => (
  <Component
    id={fieldsData3[0].id}
    htmlType="radiobutton"
    label="Choose an option:"
    fieldsData={fieldsData3}
  />
);

export const CheckButtonList = () => (
  <Component
    id={fieldsData4[0].id}
    htmlType="checkbox"
    label="Choose an option:"
    fieldsData={fieldsData4}
  />
);
