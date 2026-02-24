import {
  act,
  screen,
  render,
  fireEvent,
} from '#app/components/react-testing-library-with-providers';
import { RefObject } from 'react';
import LastestPostButton from '.';

jest.useFakeTimers();

describe('LatestPostButton', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn().mockImplementation(() => ({
        matches: false,
      })),
      writable: true,
    });
  });

  it('should be visible when there is a pending update, and when the first post is not visible', async () => {
    const { container } = await act(async () => {
      return render(
        <LastestPostButton
          isFirstPostVisible={false}
          hasPendingUpdate
          streamRef={null}
        />,
      );
    });

    const button = container.querySelector(
      'button[aria-atomic="true"][aria-live="polite"]',
    );

    expect(button).not.toBeNull();
  });

  it('should be invisible when there is no pending update or when the first post is not visible', async () => {
    const { container } = await act(async () => {
      return render(
        <LastestPostButton
          isFirstPostVisible
          hasPendingUpdate={false}
          streamRef={null}
        />,
      );
    });

    const button = container.querySelector(
      'button[aria-atomic="true"][aria-live="polite"]',
    );

    expect(button).toBeNull();
  });

  it('should clear after 10 seconds of being visible', async () => {
    const { container } = await act(async () => {
      return render(
        <LastestPostButton
          isFirstPostVisible={false}
          hasPendingUpdate
          streamRef={null}
        />,
      );
    });

    const button = container.querySelector(
      'button[aria-atomic="true"][aria-live="polite"]',
    );

    expect(button).not.toBeNull();

    act(() => {
      jest.runAllTimers();
    });

    const buttonAfter10Sec = container.querySelector(
      'button[aria-atomic="true"][aria-live="polite"]',
    );

    expect(buttonAfter10Sec).toBeNull();
  });

  it('scroll the page up when clicked on', async () => {
    const streamRefMock = {
      current: {
        scrollIntoView: jest.fn(),
      },
    };

    await act(async () => {
      return render(
        <LastestPostButton
          isFirstPostVisible={false}
          hasPendingUpdate
          streamRef={streamRefMock as unknown as RefObject<HTMLDivElement>}
        />,
      );
    });

    const button = screen.getByTestId('latest-post-button');
    fireEvent.click(button);

    expect(streamRefMock.current.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
    });
  });
});
