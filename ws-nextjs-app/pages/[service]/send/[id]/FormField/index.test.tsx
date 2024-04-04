import React from 'react';
import {
  act,
  render,
} from '#app/components/react-testing-library-with-providers';
import FormField, { FormComponentProps } from '.';
import { FormContextProvider } from '../FormContext';
import { Field } from '../types';

jest.mock('next/router', () => ({
  useRouter: () => ({ query: { id: 'u1234' } }),
}));

const ComponentWithContext = ({
  props,
  fields,
}: {
  props: FormComponentProps;
  fields: Field[];
}) => (
  <FormContextProvider fields={fields}>
    <FormField {...props} />
  </FormContextProvider>
);

describe('FormField', () => {
  it('should render a text input with an associated label', async () => {
    const { container } = await act(() => {
      return render(
        <ComponentWithContext
          props={{
            id: 'testTextID',
            htmlType: 'text',
            label: 'This is a text field',
          }}
          fields={[
            {
              id: 'testTextID',
              validation: {},
            } as unknown as Field,
          ]}
        />,
      );
    });

    const label = container.querySelector('label[for=testTextID]');
    const text = container.querySelector('input[id=testTextID][type=text]');

    expect(label).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render a textarea input with an associated label', async () => {
    const { container } = await act(() => {
      return render(
        <ComponentWithContext
          props={{
            id: 'testTextAreaID',
            htmlType: 'textarea',
            label: 'This is a text field',
          }}
          fields={[
            {
              id: 'testTextAreaID',
              validation: {},
            } as unknown as Field,
          ]}
        />,
      );
    });

    const label = container.querySelector('label[for=testTextAreaID]');
    const textArea = container.querySelector('textarea[id=testTextAreaID]');

    expect(label).toBeInTheDocument();
    expect(textArea).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render an email input with an associated label', async () => {
    const { container } = await act(() => {
      return render(
        <ComponentWithContext
          props={{
            id: 'testEmailID',
            htmlType: 'email',
            label: 'This is a text field',
          }}
          fields={[
            {
              id: 'testEmailID',
              validation: {},
            } as unknown as Field,
          ]}
        />,
      );
    });

    const label = container.querySelector('label[for=testEmailID]');
    const text = container.querySelector('input[id=testEmailID][type=email]');

    expect(label).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render a checkbox input with an associated label', async () => {
    const { container } = await act(() => {
      return render(
        <ComponentWithContext
          props={{
            id: 'testCheckboxID',
            htmlType: 'checkbox',
            label: 'This is a text field',
          }}
          fields={[
            {
              id: 'testCheckboxID',
              validation: {},
            } as unknown as Field,
          ]}
        />,
      );
    });

    const label = container.querySelector('label[for=testCheckboxID]');
    const checkboxInput = container.querySelector(
      'input[id=testCheckboxID][type=checkbox]',
    );

    expect(label).toBeInTheDocument();
    expect(checkboxInput).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render a tel input with an associated label', async () => {
    const { container } = await act(() => {
      return render(
        <ComponentWithContext
          props={{
            id: 'testTelID',
            htmlType: 'phone',
            label: 'This is a text field',
          }}
          fields={[
            {
              id: 'testTelID',
              validation: {},
            } as unknown as Field,
          ]}
        />,
      );
    });

    const label = container.querySelector('label[for=testTelID]');
    const telephoneInput = container.querySelector(
      'input[id=testTelID][type=tel]',
    );

    expect(label).toBeInTheDocument();
    expect(telephoneInput).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
