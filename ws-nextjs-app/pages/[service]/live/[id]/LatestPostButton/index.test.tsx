import {
  act,
  screen,
  render,
  fireEvent,
} from '#app/components/react-testing-library-with-providers';
import { RefObject } from 'react';
import * as useCustomEventTrackerModule from '#app/hooks/useCustomEventTracker';
import LastestPostButton from '.';

jest.useFakeTimers();

const mockTrackEvent = jest.fn();
const mockUseCustomEventTracker = jest.spyOn(
  useCustomEventTrackerModule,
  'default',
);
mockUseCustomEventTracker.mockReturnValue(mockTrackEvent);

const defaultProps = {
  pendingUpdateTime: Date.now(),
  pageId: 'test-page-id',
  newPostCount: 3,
};

describe('LatestPostButton', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn().mockImplementation(() => ({
        matches: false,
      })),
      writable: true,
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCustomEventTracker.mockReturnValue(mockTrackEvent);
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
  ])(
    '$title',
    async ({ isFirstPostVisible, hasPendingUpdate, shouldButtonBeVisible }) => {
      const { container } = await act(async () => {
        return render(
          <LastestPostButton
            isFirstPostVisible={isFirstPostVisible}
            hasPendingUpdate={hasPendingUpdate}
            streamRef={null}
            {...defaultProps}
          />,
        );
      });

      const button = container.querySelector(
        'button[data-testid="latest-post-button"]',
      );

      if (shouldButtonBeVisible) {
        expect(button).not.toBeNull();
      } else {
        expect(button).toBeNull();
      }
    },
  );

  it('should clear after 10 seconds of being visible', async () => {
    const { container } = await act(async () => {
      return render(
        <LastestPostButton
          isFirstPostVisible={false}
          hasPendingUpdate
          streamRef={null}
          {...defaultProps}
        />,
      );
    });

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

    await act(async () => {
      return render(
        <LastestPostButton
          isFirstPostVisible={false}
          hasPendingUpdate
          streamRef={streamRefMock as unknown as RefObject<HTMLDivElement>}
          {...defaultProps}
        />,
      );
    });

    const button = screen.getByTestId('latest-post-button');
    fireEvent.click(button);

    expect(streamRefMock.current.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
    });
  });

  it('should initialize useCustomEventTracker with the correct event names', async () => {
    await act(async () => {
      return render(
        <LastestPostButton
          isFirstPostVisible={false}
          hasPendingUpdate
          streamRef={null}
          {...defaultProps}
        />,
      );
    });

    expect(mockUseCustomEventTracker).toHaveBeenCalledWith({
      eventName: 'live_refresh_button_shown',
    });
    expect(mockUseCustomEventTracker).toHaveBeenCalledWith({
      eventName: 'live_refresh_button_clicked',
    });
  });

  it('should send a button shown tracking event with page_id, time_since_last_update and post_count_since_last_view', async () => {
    await act(async () => {
      return render(
        <LastestPostButton
          isFirstPostVisible={false}
          hasPendingUpdate
          streamRef={null}
          {...defaultProps}
        />,
      );
    });

    expect(mockTrackEvent).toHaveBeenCalledWith(
      expect.stringContaining('"page_id":"test-page-id"'),
    );
    expect(mockTrackEvent).toHaveBeenCalledWith(
      expect.stringContaining('"time_since_last_update"'),
    );
    expect(mockTrackEvent).toHaveBeenCalledWith(
      expect.stringContaining('"post_count_since_last_view":3'),
    );
  });

  it('should send a button clicked tracking event with page_id, time_since_button_shown and post_count_loaded', async () => {
    await act(async () => {
      return render(
        <LastestPostButton
          isFirstPostVisible={false}
          hasPendingUpdate
          streamRef={null}
          {...defaultProps}
        />,
      );
    });

    mockTrackEvent.mockClear();

    const button = screen.getByTestId('latest-post-button');
    fireEvent.click(button);

    expect(mockTrackEvent).toHaveBeenCalledWith(
      expect.stringContaining('"page_id":"test-page-id"'),
    );
    expect(mockTrackEvent).toHaveBeenCalledWith(
      expect.stringContaining('"time_since_button_shown"'),
    );
    expect(mockTrackEvent).toHaveBeenCalledWith(
      expect.stringContaining('"post_count_loaded":3'),
    );
  });
});
