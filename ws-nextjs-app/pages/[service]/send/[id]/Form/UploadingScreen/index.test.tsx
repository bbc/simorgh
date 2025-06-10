import React from 'react';
import {
  act,
  render,
} from '#app/components/react-testing-library-with-providers';
import UploadingScreen from '.';

const MOCK_TITLE = 'Uploading';

describe('ErrorScreen', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('Should have an H1 tag', async () => {
    const { container } = await act(() =>
      render(<UploadingScreen title={MOCK_TITLE} />),
    );

    const h1 = container.querySelector('h1');

    expect(h1?.innerHTML).toBe('Uploading');
  });

  it('Should have a P tag', async () => {
    const { container } = await act(() =>
      render(<UploadingScreen title={MOCK_TITLE} />),
    );

    const p = container.querySelector('p');

    expect(p?.innerHTML).toBe('Please wait until it is finished.');
  });
});
