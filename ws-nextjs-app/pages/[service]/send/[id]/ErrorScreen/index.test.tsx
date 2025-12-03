import React from 'react';
import {
  act,
  render,
} from '#app/components/react-testing-library-with-providers';
import ErrorScreen from '.';

const MOCK_TITLE = 'Submit your suggestions';

describe('ErrorScreen', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('Should have an H1 tag', async () => {
    const { container } = await act(() =>
      render(<ErrorScreen title={MOCK_TITLE} />),
    );

    const h1 = container.querySelector('h1');

    expect(h1?.innerHTML).toBe('Sorry, your message could not be sent.');
  });

  it('Should have a P tag', async () => {
    const { container } = await act(() =>
      render(<ErrorScreen title={MOCK_TITLE} />),
    );

    const p = container.querySelector('p');

    expect(p?.innerHTML).toBe('Please try again later.');
  });
});
