import React from 'react';
import {
  act,
  render,
  fireEvent,
} from '#app/components/react-testing-library-with-providers';
import {
  title,
  description,
  sectionTitle,
  privacyNotice,
  fields,
} from './fixture';
import { FormContext } from '../FormContext';
import Form from '.';
import { Field } from '../types';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { id: '123' },
  }),
}));

describe('Form', () => {
  it('should render and match snapshot', async () => {
    const { container } = await act(() => {
      return render(
        <Form
          title={title}
          description={description}
          sectionTitle={sectionTitle}
          privacyNotice={privacyNotice}
          fields={fields as Field[]}
        />,
      );
    });

    const form = container.querySelector('form');
    expect(form).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should handle submit', async () => {
    const handleSubmit = jest.fn(e => e.preventDefault());
    const handleChange = jest.fn();
    const { container } = await act(() => {
      return render(
        <FormContext.Provider
          value={{
            formState: {},
            handleChange,
            handleSubmit,
            submissionError: null,
            submitted: false,
            progress: '0',
            hasAttemptedSubmit: false,
            screen: 'form',
            submissionID: null,
          }}
        >
          <Form
            title={title}
            description={description}
            sectionTitle={sectionTitle}
            privacyNotice={privacyNotice}
            fields={fields as Field[]}
          />
          ,
        </FormContext.Provider>,
      );
    });

    const submitButton = container.querySelector('button');
    fireEvent.click(submitButton as HTMLButtonElement);

    expect(handleSubmit).toHaveBeenCalled();
  });
});
