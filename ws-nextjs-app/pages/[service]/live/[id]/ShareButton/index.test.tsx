import React from 'react';
import {
  render,
  screen,
  act,
} from '#app/components/react-testing-library-with-providers';
import userEvent from '@testing-library/user-event';
import ShareButton from '.';

const share = jest.fn().mockImplementation(() => Promise.resolve());
Object.assign(navigator, {
  share,
});

describe('ShareButton', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockShareButtonProps = {
    eventTrackingData: {
      componentName: 'foo',
    },
    contentId: 'urn:foo',
    headline: 'bar',
  };

  it('should call the navigator share api when clicked', async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<ShareButton {...mockShareButtonProps} />);
    });

    const shareButton = screen.getByRole('button');
    await user.click(shareButton);

    expect(navigator.share).toHaveBeenCalled();
  });

  it('should bring focus to the button after it has been clicked', async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<ShareButton {...mockShareButtonProps} />);
    });

    const shareButton = screen.getByRole('button');
    await user.click(shareButton);

    expect(shareButton).toHaveFocus();
  });
});
