import React from 'react';
import {
  act,
  render,
} from '#app/components/react-testing-library-with-providers';
import SucccessMessage from '.';

describe('SuccessMessage', () => {
  it('Should have a h1', async () => {
    const { container } = await act(() => {
      return render(<SucccessMessage submissionId="test-submission-id" />);
    });
    const h1 = container.querySelector('h1');

    expect(h1?.innerHTML).toBe('Message sent');
  });

  it('Should have a retention policy', async () => {
    const { container } = await act(() => {
      return render(<SucccessMessage submissionId="test-submission-id" />);
    });

    expect(container.innerHTML).toContain(
      `We'll keep your submission for up to`,
    );
  });

  it('Should provide an email for removal services', async () => {
    const { container } = await act(() => {
      return render(<SucccessMessage submissionId="test-submission-id" />);
    });

    const emailAnchor = container.querySelector(
      'a[href="mailto:CannotFindEmail@bbc.co.uk"]',
    );

    expect(emailAnchor).toBeInTheDocument();
  });

  it('Should have a privacy policy link', async () => {
    const { container } = await act(() => {
      return render(<SucccessMessage submissionId="test-submission-id" />);
    });

    const policyAnchor = container.querySelector(
      'a[href="https://www.bbc.com/privacy/"]',
    );

    expect(policyAnchor).toBeInTheDocument();
  });
});
