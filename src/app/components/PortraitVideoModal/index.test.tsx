import Component, {
  playlistLoadedCallback,
  statsNavigationCallback,
  playbackEndedCallback,
} from '.';
import {
  screen,
  render,
  fireEvent,
} from '../react-testing-library-with-providers';
import blocks from './fixture';
import { Player, SMPEvent } from '../MediaLoader/types';

const eventTrackingData = {
  componentName: 'portrait-video-modal',
  alwaysInView: true,
};

const mockClose = jest.fn();

const mockSwipeTracker = jest.fn();

const mockPlayer = {
  queuePlaylist: jest.fn(),
  setPreviousPlaylist: jest.fn(),
  pause: jest.fn(),
  next: jest.fn(),
  previous: jest.fn(),
} satisfies Partial<Player>;

describe('PortraitVideoModal', () => {
  it('should render the modal when active', () => {
    render(
      <Component
        selectedVideoIndex={0}
        blocks={blocks}
        onClose={mockClose}
        eventTrackingData={eventTrackingData}
      />,
    );

    const modal = screen.getByRole('dialog');

    expect(modal).toBeInTheDocument();
  });

  it('should set the root React element to "inert" when the modal is open', () => {
    render(
      <div id="root">
        <Component
          selectedVideoIndex={0}
          blocks={blocks}
          onClose={mockClose}
          eventTrackingData={eventTrackingData}
        />
      </div>,
    );

    const rootElement = document.getElementById('root');

    expect(rootElement).toHaveAttribute('inert');
  });

  it('should close the modal when the close button is clicked', () => {
    render(
      <Component
        selectedVideoIndex={0}
        blocks={blocks}
        onClose={mockClose}
        eventTrackingData={eventTrackingData}
      />,
    );

    const closeButton = screen.getByTestId('close-modal-button');

    closeButton.click();

    expect(mockClose).toHaveBeenCalled();
  });

  it('should close the modal when the escape key is pressed', () => {
    render(
      <Component
        selectedVideoIndex={0}
        blocks={blocks}
        onClose={mockClose}
        eventTrackingData={eventTrackingData}
      />,
    );

    const dialog = screen.getByRole('dialog');
    fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' });

    expect(mockClose).toHaveBeenCalled();
  });

  it('should not close the modal when clicking outside the modal with a mouse', () => {
    render(
      <Component
        selectedVideoIndex={0}
        blocks={blocks}
        onClose={mockClose}
        eventTrackingData={eventTrackingData}
      />,
    );

    const dialog = screen.getByRole('dialog');
    fireEvent.mouseDown(dialog);

    expect(mockClose).toHaveBeenCalled();
  });

  it('should not close the modal when clicking outside the modal with touch', () => {
    render(
      <Component
        selectedVideoIndex={0}
        blocks={blocks}
        onClose={mockClose}
        eventTrackingData={eventTrackingData}
      />,
    );

    const dialog = screen.getByRole('dialog');
    fireEvent.touchStart(dialog);

    expect(mockClose).toHaveBeenCalled();
  });

  it('should perform clean-up when component is unmounted', () => {
    Object.defineProperty(window, 'embeddedMedia', {
      writable: true,
      value: {
        api: {
          players: () => ({ bbcMediaPlayer0: mockPlayer }),
        },
      },
    });

    const { unmount } = render(
      <Component
        selectedVideoIndex={0}
        blocks={blocks}
        onClose={mockClose}
        eventTrackingData={eventTrackingData}
      />,
    );

    const dialog = screen.getByRole('dialog');
    const removeEventListenerSpy = jest.spyOn(dialog, 'removeEventListener');

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'mousedown',
      expect.any(Function),
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'touchstart',
      expect.any(Function),
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function),
    );
    expect(mockPlayer.pause).toHaveBeenCalled();
  });

  describe('"End of content. Close" button', () => {
    it('renders the visually hidden close button', () => {
      render(
        <Component
          selectedVideoIndex={0}
          blocks={blocks}
          onClose={mockClose}
          eventTrackingData={eventTrackingData}
        />,
      );
      const hiddenCloseButton = screen.getByTestId(
        'close-modal-visually-hidden',
      );
      expect(hiddenCloseButton).toBeInTheDocument();
      expect(hiddenCloseButton).toHaveTextContent('End of content. Close');
      expect(hiddenCloseButton).toHaveAttribute(
        'aria-label',
        'End of content. Close',
      );
    });
    it('calls onClose when visually hidden close button is clicked', () => {
      render(
        <Component
          selectedVideoIndex={0}
          blocks={blocks}
          onClose={mockClose}
          eventTrackingData={eventTrackingData}
        />,
      );
      const hiddenCloseButton = screen.getByTestId(
        'close-modal-visually-hidden',
      );
      fireEvent.click(hiddenCloseButton);
      expect(mockClose).toHaveBeenCalled();
    });
    it('renders the visually hidden close button as the last focusable element', () => {
      render(
        <Component
          selectedVideoIndex={0}
          blocks={blocks}
          onClose={mockClose}
          eventTrackingData={eventTrackingData}
        />,
      );
      const hiddenCloseButton = screen.getByTestId(
        'close-modal-visually-hidden',
      );
      expect(hiddenCloseButton).toBeInTheDocument();
      expect(hiddenCloseButton).toHaveTextContent('End of content. Close');
      expect(hiddenCloseButton).toHaveAttribute(
        'aria-label',
        'End of content. Close',
      );
    });

    it('loops focus from the last button to the close button when tabbing forward', () => {
      render(
        <Component
          selectedVideoIndex={0}
          blocks={blocks}
          onClose={mockClose}
          eventTrackingData={eventTrackingData}
        />,
      );
      const closeButton = screen.getByTestId('close-modal-button');
      const hiddenCloseButton = screen.getByTestId(
        'close-modal-visually-hidden',
      );
      hiddenCloseButton.focus();
      fireEvent.keyDown(document.activeElement || document.body, {
        key: 'Tab',
      });
      expect(closeButton).toHaveFocus();
    });

    it('focuses the hidden close button when tabbing backwards from the close button', () => {
      render(
        <Component
          selectedVideoIndex={0}
          blocks={blocks}
          onClose={mockClose}
          eventTrackingData={eventTrackingData}
        />,
      );
      const closeButton = screen.getByTestId('close-modal-button');
      const hiddenCloseButton = screen.getByTestId(
        'close-modal-visually-hidden',
      );
      closeButton.focus();
      fireEvent.keyDown(document.activeElement || document.body, {
        key: 'Tab',
        shiftKey: true,
      });
      expect(hiddenCloseButton).toHaveFocus();
    });
  });
  describe('playlistLoadedCallback', () => {
    beforeEach(() => {
      jest.clearAllMocks();

      Object.defineProperty(window, 'embeddedMedia', {
        writable: true,
        value: {
          api: {
            players: () => ({ bbcMediaPlayer0: mockPlayer }),
          },
        },
      });
    });

    it('should call the playlistLoadedCallback and call queuePlaylist for the next video', () => {
      const mockSMPEvent: SMPEvent = {
        playlist: {
          items: [{ versionID: blocks[0].model.video.version.id }],
        },
      };

      playlistLoadedCallback(mockSMPEvent, blocks);

      const [_currentVideo, nextVideo] = blocks;

      expect(mockPlayer.setPreviousPlaylist).not.toHaveBeenCalled();

      expect(mockPlayer.queuePlaylist).toHaveBeenCalledWith(
        {
          title: nextVideo.model.video.title,
          holdingImageURL: nextVideo.model.video.holdingImageURL,
          items: [{ versionID: nextVideo.model.video.version.id }],
        },
        { statsObject: { clipPID: nextVideo.model.video.id } },
      );
    });

    it('should call the playlistLoadedCallback and call setPreviousPlaylist for the previous video and queuePlaylist for the next video', () => {
      const mockSMPEvent: SMPEvent = {
        playlist: {
          items: [{ versionID: blocks[1].model.video.version.id }],
        },
      };

      playlistLoadedCallback(mockSMPEvent, blocks);

      const [prevVideo, _current, nextVideo] = blocks;

      expect(mockPlayer.setPreviousPlaylist).toHaveBeenCalledWith(
        {
          title: prevVideo.model.video.title,
          holdingImageURL: prevVideo.model.video.holdingImageURL,
          items: [{ versionID: prevVideo.model.video.version.id }],
        },
        { statsObject: { clipPID: prevVideo.model.video.id } },
      );

      expect(mockPlayer.queuePlaylist).toHaveBeenCalledWith(
        {
          title: nextVideo.model.video.title,
          holdingImageURL: nextVideo.model.video.holdingImageURL,
          items: [{ versionID: nextVideo.model.video.version.id }],
        },
        { statsObject: { clipPID: nextVideo.model.video.id } },
      );
    });

    it('should call playlistLoadedCallback and setPreviousPlaylist if there are no next videos', () => {
      const mockSMPEvent: SMPEvent = {
        playlist: {
          items: [
            { versionID: blocks[blocks.length - 1].model.video.version.id },
          ],
        },
      };

      playlistLoadedCallback(mockSMPEvent, blocks);

      const [prevVideo] = blocks.slice(-2);

      expect(mockPlayer.setPreviousPlaylist).toHaveBeenCalledWith(
        {
          title: prevVideo.model.video.title,
          holdingImageURL: prevVideo.model.video.holdingImageURL,
          items: [{ versionID: prevVideo.model.video.version.id }],
        },
        { statsObject: { clipPID: prevVideo.model.video.id } },
      );

      expect(mockPlayer.queuePlaylist).not.toHaveBeenCalled();
    });
  });

  describe('statsNavigationCallback', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should call the statsNavigationCallback and call swipeTracker for the next video', () => {
      const mockSMPEvent: SMPEvent = {
        playlist: {
          items: [{ versionID: blocks[0].model.video.version.id }],
        },
        direction: 'next',
        method: 'wheel',
      };

      const mockSwipeEventTrackingData = {
        ...eventTrackingData,
        groupTracker: {
          name: 'group name',
          itemCount: 20,
          resourceId: 'urn:bbc:tipo:list:fe4a1c8c-9a7c-4a50-845d-7da91aa65204',
          position: 4,
        },
      };

      statsNavigationCallback(
        mockSMPEvent,
        blocks,
        mockSwipeEventTrackingData,
        mockSwipeTracker,
      );

      const [_currentVideo, nextVideo] = blocks;

      expect(mockSwipeTracker).toHaveBeenCalledWith({
        ...eventTrackingData,
        groupTracker: {
          name: 'group name',
          itemCount: 20,
          resourceId: 'urn:bbc:tipo:list:fe4a1c8c-9a7c-4a50-845d-7da91aa65204',
          position: 4,
          type: 'portrait-video-modal',
        },
        itemTracker: {
          type: 'portrait-video',
          text: nextVideo.model.video.title,
          mediaType: 'video',
          position: 2,
          duration: 165000,
          resourceId: nextVideo.model.video.id,
        },
      });
    });

    it('should call the statsNavigationCallback and call swipeTracker for the previous video', () => {
      const mockSMPEvent: SMPEvent = {
        playlist: {
          items: [{ versionID: blocks[1].model.video.version.id }],
        },
        direction: 'previous',
        method: 'wheel',
      };

      const mockSwipeEventTrackingData = {
        ...eventTrackingData,
        groupTracker: {
          name: 'group name',
          itemCount: 20,
          resourceId: 'urn:bbc:tipo:list:fe4a1c8c-9a7c-4a50-845d-7da91aa65204',
          position: 4,
        },
      };

      statsNavigationCallback(
        mockSMPEvent,
        blocks,
        mockSwipeEventTrackingData,
        mockSwipeTracker,
      );

      const [previousVideo] = blocks;

      expect(mockSwipeTracker).toHaveBeenCalledWith({
        ...eventTrackingData,
        groupTracker: {
          name: 'group name',
          itemCount: 20,
          resourceId: 'urn:bbc:tipo:list:fe4a1c8c-9a7c-4a50-845d-7da91aa65204',
          position: 4,
          type: 'portrait-video-modal',
        },
        itemTracker: {
          type: 'portrait-video',
          text: previousVideo.model.video.title,
          mediaType: 'video',
          position: 1,
          duration: 150000,
          resourceId: previousVideo.model.video.id,
        },
      });
    });

    it('should not call swipeTracker for the an unsupported navigation method', () => {
      const mockSMPEvent: SMPEvent = {
        playlist: {
          items: [{ versionID: blocks[1].model.video.version.id }],
        },
        direction: 'previous',
        // @ts-expect-error 'swipe' and 'wheel' are the supported methods
        method: 'api',
      };

      const mockSwipeEventTrackingData = {
        ...eventTrackingData,
        groupTracker: {
          name: 'group name',
          itemCount: 20,
          resourceId: 'urn:bbc:tipo:list:fe4a1c8c-9a7c-4a50-845d-7da91aa65204',
          position: 4,
        },
      };

      statsNavigationCallback(
        mockSMPEvent,
        blocks,
        mockSwipeEventTrackingData,
        mockSwipeTracker,
      );

      expect(mockSwipeTracker).not.toHaveBeenCalled();
    });
  });

  describe('playbackEndedCallback', () => {
    beforeEach(() => {
      jest.clearAllMocks();

      Object.defineProperty(window, 'embeddedMedia', {
        writable: true,
        value: {
          api: {
            players: () => ({
              bbcMediaPlayer0: {
                ...mockPlayer,
                settings: jest.fn(() => ({
                  autoplay: true,
                })),
                playlist: jest.fn(() => ({
                  items: [{ versionID: blocks[0].model.video.version.id }],
                })),
              },
            }),
          },
        },
      });
    });

    it('should call the playbackEndedCallback and call swipeTracker for the next video', () => {
      const mockSMPEvent: SMPEvent = {
        ended: true,
      };

      const mockSwipeEventTrackingData = {
        ...eventTrackingData,
        groupTracker: {
          name: 'group name',
          itemCount: 20,
          resourceId: 'urn:bbc:tipo:list:fe4a1c8c-9a7c-4a50-845d-7da91aa65204',
          position: 4,
        },
      };

      playbackEndedCallback(
        mockSMPEvent,
        blocks,
        mockSwipeEventTrackingData,
        mockSwipeTracker,
      );

      const [_currentVideo, nextVideo] = blocks;

      expect(mockSwipeTracker).toHaveBeenCalledWith({
        ...eventTrackingData,
        groupTracker: {
          name: 'group name',
          itemCount: 20,
          resourceId: 'urn:bbc:tipo:list:fe4a1c8c-9a7c-4a50-845d-7da91aa65204',
          position: 4,
          type: 'portrait-video-modal',
        },
        itemTracker: {
          type: 'portrait-video',
          text: nextVideo.model.video.title,
          mediaType: 'video',
          position: 2,
          duration: 165000,
          resourceId: nextVideo.model.video.id,
        },
      });
    });

    it('should not call playbackEndedCallback when autoplay is disabled', () => {
      Object.defineProperty(window, 'embeddedMedia', {
        writable: true,
        value: {
          api: {
            players: () => ({
              bbcMediaPlayer0: {
                ...mockPlayer,
                settings: jest.fn(() => ({
                  autoplay: false,
                })),
              },
            }),
          },
        },
      });

      const mockSMPEvent: SMPEvent = {
        ended: true,
      };

      const mockSwipeEventTrackingData = {
        ...eventTrackingData,
        groupTracker: {
          name: 'group name',
          itemCount: 20,
          resourceId: 'urn:bbc:tipo:list:fe4a1c8c-9a7c-4a50-845d-7da91aa65204',
          position: 4,
        },
      };

      playbackEndedCallback(
        mockSMPEvent,
        blocks,
        mockSwipeEventTrackingData,
        mockSwipeTracker,
      );

      expect(mockSwipeTracker).not.toHaveBeenCalled();
    });

    it('should not call playbackEndedCallback when the video has not ended', () => {
      const mockSMPEvent: SMPEvent = {
        ended: false,
      };

      const mockSwipeEventTrackingData = {
        ...eventTrackingData,
        groupTracker: {
          name: 'group name',
          itemCount: 20,
          resourceId: 'urn:bbc:tipo:list:fe4a1c8c-9a7c-4a50-845d-7da91aa65204',
          position: 4,
        },
      };

      playbackEndedCallback(
        mockSMPEvent,
        blocks,
        mockSwipeEventTrackingData,
        mockSwipeTracker,
      );

      expect(mockSwipeTracker).not.toHaveBeenCalled();
    });
  });

  describe('Navigation arrow buttons', () => {
    beforeEach(() => {
      jest.clearAllMocks();

      Object.defineProperty(window, 'embeddedMedia', {
        writable: true,
        value: {
          api: {
            players: () => ({ bbcMediaPlayer0: mockPlayer }),
          },
        },
      });
    });

    it('disables the previous button on the first video', async () => {
      render(
        <Component
          selectedVideoIndex={0}
          blocks={blocks}
          onClose={mockClose}
          eventTrackingData={eventTrackingData}
        />,
      );

      const mockSMPEvent: SMPEvent = {
        playlist: {
          items: [{ versionID: blocks[0].model.video.version.id }],
        },
      };

      playlistLoadedCallback(mockSMPEvent, blocks);

      expect(screen.getByTestId('previous-video-button')).toBeDisabled();
    });

    it('disables the next button on the last video', () => {
      render(
        <Component
          selectedVideoIndex={blocks.length - 1}
          blocks={blocks}
          onClose={mockClose}
          eventTrackingData={eventTrackingData}
        />,
      );

      const mockSMPEvent: SMPEvent = {
        playlist: {
          items: [
            { versionID: blocks[blocks.length - 1].model.video.version.id },
          ],
        },
      };

      playlistLoadedCallback(mockSMPEvent, blocks);

      expect(screen.getByTestId('next-video-button')).toBeDisabled();
    });

    it('enables both buttons when not at first or last video', () => {
      const middleIndex = Math.floor(blocks.length / 2);

      render(
        <Component
          selectedVideoIndex={middleIndex}
          blocks={blocks}
          onClose={mockClose}
          eventTrackingData={eventTrackingData}
        />,
      );

      const mockSMPEvent: SMPEvent = {
        playlist: {
          items: [{ versionID: blocks[middleIndex].model.video.version.id }],
        },
      };

      playlistLoadedCallback(mockSMPEvent, blocks);

      expect(screen.getByTestId('previous-video-button')).toBeEnabled();
      expect(screen.getByTestId('next-video-button')).toBeEnabled();
    });

    it('calls "previous" API method when previous button is clicked', () => {
      render(
        <Component
          selectedVideoIndex={1}
          blocks={blocks}
          onClose={mockClose}
          eventTrackingData={eventTrackingData}
        />,
      );

      const previousButton = screen.getByTestId('previous-video-button');

      previousButton.click();

      expect(mockPlayer.previous).toHaveBeenCalled();
    });

    it('calls "next" API method when next button is clicked', () => {
      render(
        <Component
          selectedVideoIndex={0}
          blocks={blocks}
          onClose={mockClose}
          eventTrackingData={eventTrackingData}
        />,
      );

      const nextButton = screen.getByTestId('next-video-button');

      nextButton.click();

      expect(mockPlayer.next).toHaveBeenCalled();
    });
  });
});
