import React, { FormEvent } from 'react';
import {
  act,
  render,
} from '#app/components/react-testing-library-with-providers';

import fetchMock from 'fetch-mock';
import SubmitButton, { handleSubmit } from '.';

describe('SubmitButton', () => {
  it('should render a submit button with an associated label', async () => {
    const { container } = await act(() => {
      return render(<SubmitButton />, { service: 'news' });
    });

    const button = container.querySelector('input[type=submit][value=Submit]');

    expect(button).toBeInTheDocument();
    expect(button).toMatchSnapshot();
  });
});

describe('handleSubmit', () => {
  const postURL = '/myUrl.com';

  afterEach(() => {
    jest.clearAllMocks();
    fetchMock.restore();
  });

  it('should pre validate and POST data', async () => {
    fetchMock.post(postURL, 200);

    const mockEvent = {
      target: {},
      preventDefault: jest.fn(),
    } as unknown as FormEvent;

    await handleSubmit(mockEvent);

    const expectedPostData = { surname: 'BBC TEST NAME' };
    const actualPostResponse = fetchMock.calls(postURL)?.[0][1]?.body as string;

    expect(JSON.parse(actualPostResponse)).toStrictEqual(expectedPostData);
  });
});
