import React from 'react';
import {
  render,
  screen,
  act,
} from '#app/components/react-testing-library-with-providers';
import userEvent from '@testing-library/user-event';
import * as useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import * as useViewTracker from '#app/hooks/useViewTracker';
import ShareButton from '.';

const useClickTrackerHandlerSpy = jest.spyOn(useClickTrackerHandler, 'default');
const useViewTrackerSpy = jest.spyOn(useViewTracker, 'default');
const share = jest.fn().mockImplementation(() => Promise.resolve());
Object.assign(navigator, {
  share,
});

describe('ShareButton', () => {
  afterEach(() => {
    useClickTrackerHandlerSpy.mockRestore();
    useViewTrackerSpy.mockRestore();
    jest.clearAllMocks();
  });

  const mockShareButtonProps = {
    eventTrackingData: {
      componentName: 'foo',
    },
    contentId: 'urn:foo',
    headline: 'bar',
  };

  it('should call click tracker handler hook when button is clicked', async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<ShareButton {...mockShareButtonProps} />);
    });

    const shareButton = screen.getByRole('button');
    await user.click(shareButton);

    expect(useClickTrackerHandlerSpy).toHaveBeenCalled();
  });

  it('should call view tracker handler when button is viewed', async () => {
    await act(async () => {
      render(<ShareButton {...mockShareButtonProps} />);
    });

    expect(useViewTrackerSpy).toHaveBeenCalled();
  });

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
