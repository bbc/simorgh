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

const MOCK_TITLE = 'Test Title';
const MOCK_EMAIL = 'test@bbc.co.uk';
const MOCK_RETENTION_PERIOD = '270';

describe('SuccessScreen', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('Should have a h1', async () => {
    const { container } = await act(() => {
      return render(
        <SuccessScreen
          title={MOCK_TITLE}
          replyEmailAddress={MOCK_EMAIL}
          retentionPeriod={MOCK_RETENTION_PERIOD}
        />,
      );
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
          <SuccessScreen
            title={MOCK_TITLE}
            replyEmailAddress={MOCK_EMAIL}
            retentionPeriod={MOCK_RETENTION_PERIOD}
          />
        </FormContext.FormContextProvider>,
      );
    });

    expect(container.innerHTML).toContain(`TestSubmissionID`);
  });

  it('Should have a retention policy if a retention period is provided', async () => {
    const { container } = await act(() => {
      return render(
        <SuccessScreen
          title={MOCK_TITLE}
          replyEmailAddress={MOCK_EMAIL}
          retentionPeriod={MOCK_RETENTION_PERIOD}
        />,
      );
    });

    expect(container.innerHTML).toContain(
      `We'll keep your submission for up to 270 days – and if we don't use it we'll then delete it and any other information you sent us.`,
    );
  });

  it('Should not have a retention policy if retention period is not provided', async () => {
    const { container } = await act(() => {
      return render(
        <SuccessScreen
          title={MOCK_TITLE}
          replyEmailAddress={MOCK_EMAIL}
          retentionPeriod=""
        />,
      );
    });

    expect(container.innerHTML).not.toContain(
      `We'll keep your submission for up to 270 days – and if we don't use it we'll then delete it and any other information you sent us.`,
    );
  });

  it('Should have an clause for removal services if reply email address is provided', async () => {
    const { container } = await act(() => {
      return render(
        <SuccessScreen
          title={MOCK_TITLE}
          replyEmailAddress={MOCK_EMAIL}
          retentionPeriod={MOCK_RETENTION_PERIOD}
        />,
      );
    });

    const emailAnchor = container.querySelector(
      'a[href="mailto:test@bbc.co.uk"]',
    );
    const emailGuidelineClauseStart = `If you change your mind and don't want us to use it, just email us at`;
    const emailGuidelineClauseEnd = `Don't forget the reference number. If you submitted something for a programme or online, we won't be able to remove it once we use it.`;

    expect(emailAnchor).toBeInTheDocument();
    expect(container.innerHTML).toContain(emailGuidelineClauseStart);
    expect(container.innerHTML).toContain(emailGuidelineClauseEnd);
  });

  it('Should not have clause for removal services if reply email addres is not provided', async () => {
    const { container } = await act(() => {
      return render(
        <SuccessScreen
          title={MOCK_TITLE}
          replyEmailAddress=""
          retentionPeriod={MOCK_RETENTION_PERIOD}
        />,
      );
    });

    const emailAnchor = container.querySelector(
      'a[href="mailto:test@bbc.co.uk"]',
    );
    const emailGuidelineClauseStart = `If you change your mind and don't want us to use it, just email us at`;
    const emailGuidelineClauseEnd = `Don't forget the reference number. If you submitted something for a programme or online, we won't be able to remove it once we use it.`;

    expect(emailAnchor).not.toBeInTheDocument();
    expect(container.innerHTML).not.toContain(emailGuidelineClauseStart);
    expect(container.innerHTML).not.toContain(emailGuidelineClauseEnd);
  });

  it('Should have a privacy policy link', async () => {
    const { container } = await act(() => {
      return render(
        <SuccessScreen
          title={MOCK_TITLE}
          replyEmailAddress={MOCK_EMAIL}
          retentionPeriod={MOCK_RETENTION_PERIOD}
        />,
      );
    });

    const policyAnchor = container.querySelector(
      'a[href="https://www.bbc.com/privacy/"]',
    );

    expect(policyAnchor).toBeInTheDocument();
  });
});
