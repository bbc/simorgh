import React from 'react';
import {
  act,
  render,
} from '#app/components/react-testing-library-with-providers';
import ClosedScreen from '.';

const MOCK_TITLE = 'Your Suggestions';
const MOCK_CLOSINGTIME = '2023-08-20T22:59:00.000Z';

describe('ClosedScreen', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('Should have an H1 tag', async () => {
    const { container } = await act(() =>
      render(
        <ClosedScreen title={MOCK_TITLE} closingTime={MOCK_CLOSINGTIME} />,
      ),
    );

    const h1 = container.querySelector('h1');

    expect(h1?.innerHTML).toBe(MOCK_TITLE);
  });

  it('Should have a P tag and TIME tag', async () => {
    const { container } = await act(() =>
      render(
        <ClosedScreen title={MOCK_TITLE} closingTime={MOCK_CLOSINGTIME} />,
      ),
    );

    const p = container.querySelector('p');
    const time = container.querySelector('time');

    expect(p?.innerHTML).toContain('This closed on');
    expect(time?.innerHTML).toContain('20 August 2023');
  });

  it('Should only show H1 if no datetime is provided', async () => {
    const { container } = await act(() =>
      render(<ClosedScreen title={MOCK_TITLE} />),
    );

    const h1 = container.querySelector('h1');
    const p = container.querySelector('p');
    const time = container.querySelector('time');

    expect(h1).not.toBeNull();
    expect(p).toBeNull();
    expect(time).toBeNull();
  });
});
