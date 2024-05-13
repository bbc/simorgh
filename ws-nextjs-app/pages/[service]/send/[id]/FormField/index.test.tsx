import React from 'react';
import {
  act,
  render,
} from '#app/components/react-testing-library-with-providers';
import * as FormContext from '../FormContext';
import FormField, { FormComponentProps } from '.';
import { Field } from '../types';
import { ContextProps } from '../FormContext';

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
  <FormContext.FormContextProvider fields={fields}>
    <FormField {...props} />
  </FormContext.FormContextProvider>
);

describe('FormField', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

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

  it.each([
    {
      attemptCount: 1,
      required: true,
      isValid: false,
      wasPreviouslyInvalid: true,
      expectedAria: '[aria-invalid=true][aria-required=true]',
    },
    {
      attemptCount: 1,
      required: true,
      isValid: true,
      wasPreviouslyInvalid: false,
      expectedAria: '[aria-required=true]',
    },
    {
      attemptCount: 1,
      required: false,
      isValid: false,
      expectedAria: '[aria-invalid=true]',
    },
    {
      attemptCount: 0,
      required: true,
      isValid: false,
      expectedAria: '',
    },
  ])(
    'should apply these attributes: $expectedAria, when attempted submit count is is $submitted, required is $required and isValid is $isValid',
    async ({ attemptCount, required, isValid, expectedAria }) => {
      const mockFormState = {
        testAllyID: {
          isValid,
          required,
          value: '',
          htmlType: 'text',
          messageCode: null,
        },
      };

      jest.spyOn(FormContext, 'useFormContext').mockImplementationOnce(
        () =>
          ({
            formState: mockFormState,
            handleChange: () => null,
            attemptCount,
          }) as unknown as ContextProps,
      );

      const { container } = await act(() => {
        return render(
          <ComponentWithContext
            props={{
              id: 'testAllyID',
              htmlType: 'text',
              label: 'This is a text field',
            }}
            fields={[]}
          />,
        );
      });

      const text = container.querySelector(
        `input[id=testAllyID][type=text]${expectedAria}`,
      );

      expect(text).toBeInTheDocument();
    },
  );
});
