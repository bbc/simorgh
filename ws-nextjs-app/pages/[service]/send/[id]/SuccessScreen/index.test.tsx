import React from 'react';
import {
  act,
  render,
} from '#app/components/react-testing-library-with-providers';
import SuccessScreen from '.';
import * as FormContext from '../FormContext';
import { ContextProps } from '../FormContext';

jest.mock('next/router', () => ({
  useRouter: () => ({ query: { id: 'u1234' } }),
}));

describe('SuccessScreen', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('Should have a h1', async () => {
    const { container } = await act(() => {
      return render(<SuccessScreen />);
    });
    const h1 = container.querySelector('h1');

    expect(h1?.innerHTML).toBe('Message sent');
  });

  it('Should have a submissionID', async () => {
    jest.spyOn(FormContext, 'useFormContext').mockImplementationOnce(
      () =>
        ({
          submissionID: 'TestSubmissionID',
        }) as unknown as ContextProps,
    );

    const { container } = await act(() => {
      return render(
        <FormContext.FormContextProvider fields={[]}>
          <SuccessScreen />
        </FormContext.FormContextProvider>,
      );
    });

    expect(container.innerHTML).toContain(`TestSubmissionID`);
  });

  it('Should have a retention policy', async () => {
    const { container } = await act(() => {
      return render(<SuccessScreen />);
    });

    expect(container.innerHTML).toContain(
      `We'll keep your submission for up to`,
    );
  });

  it('Should provide an email for removal services', async () => {
    const { container } = await act(() => {
      return render(<SuccessScreen />);
    });

    const emailAnchor = container.querySelector(
      'a[href="mailto:CannotFindEmail@bbc.co.uk"]',
    );

    expect(emailAnchor).toBeInTheDocument();
  });

  it('Should have a privacy policy link', async () => {
    const { container } = await act(() => {
      return render(<SuccessScreen />);
    });

    const policyAnchor = container.querySelector(
      'a[href="https://www.bbc.com/privacy/"]',
    );

    expect(policyAnchor).toBeInTheDocument();
  });
});
