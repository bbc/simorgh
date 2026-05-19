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

  it.each([
    {
      title:
        'should be visible when there is a pending update, and when the first post is not visible',
      isFirstPostVisible: false,
      hasPendingUpdate: true,
      shouldButtonBeVisible: true,
    },
    {
      title:
        'should be invisible when there is no pending update and the first post is visible',
      isFirstPostVisible: true,
      hasPendingUpdate: false,
      shouldButtonBeVisible: false,
    },
    {
      title:
        'should be invisible when there is a pending update but the first post is visible',
      isFirstPostVisible: true,
      hasPendingUpdate: true,
      shouldButtonBeVisible: false,
    },
  ])('$title', async ({
    isFirstPostVisible,
    hasPendingUpdate,
    shouldButtonBeVisible,
  }) => {
    const { container } = await act(async () =>
      render(
        <LastestPostButton
          isFirstPostVisible={isFirstPostVisible}
          hasPendingUpdate={hasPendingUpdate}
          streamRef={null}
        />,
      ),
    );

    const button = container.querySelector(
      'button[data-testid="latest-post-button"]',
    );

    if (shouldButtonBeVisible) {
      expect(button).not.toBeNull();
    } else {
      expect(button).toBeNull();
    }
  });

  it('should clear after 10 seconds of being visible', async () => {
    const { container } = await act(async () =>
      render(
        <LastestPostButton
          isFirstPostVisible={false}
          hasPendingUpdate
          streamRef={null}
        />,
      ),
    );

    const button = container.querySelector(
      'button[data-testid="latest-post-button"]',
    );

    expect(button).not.toBeNull();

    act(() => {
      jest.runAllTimers();
    });

    const buttonAfter10Sec = container.querySelector(
      'button[data-testid="latest-post-button"]',
    );

    expect(buttonAfter10Sec).toBeNull();
  });

  it('scroll the page up when clicked on', async () => {
    const streamRefMock = {
      current: {
        scrollIntoView: jest.fn(),
      },
    };

    await act(async () =>
      render(
        <LastestPostButton
          isFirstPostVisible={false}
          hasPendingUpdate
          streamRef={streamRefMock as unknown as RefObject<HTMLDivElement>}
        />,
      ),
    );

    const button = screen.getByTestId('latest-post-button');
    fireEvent.click(button);

    expect(streamRefMock.current.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
    });
  });
});
