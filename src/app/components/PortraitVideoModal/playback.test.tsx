import MediaLoader from '#app/components/MediaLoader';
import useSwipeTracker from '#app/hooks/useSwipeTracker';
import useViewTracker from '#app/hooks/useViewTracker';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import Component, { PortraitVideoModalProps } from '.';
import {
  act,
  fireEvent,
  render,
  screen,
} from '../react-testing-library-with-providers';
import {
  MediaPlayerEvents,
  Player,
  PlayerConfig,
  SMPEvent,
} from '../MediaLoader/types';
import blocks from './fixture';

jest.mock('#app/components/MediaLoader', () => jest.fn(() => null));
jest.mock('#app/hooks/useSwipeTracker');
jest.mock('#app/hooks/useViewTracker');

const mockMediaLoader = jest.mocked(MediaLoader);
const mockPlaybackTracker = jest.fn().mockResolvedValue(undefined);
const mockSwipeTracker = jest.fn().mockResolvedValue(undefined);
const mockClose = jest.fn();
const eventTrackingData = {
  componentName: 'portrait-video-modal',
  alwaysInView: true,
  groupTracker: { name: 'Portrait carousel', position: 2 },
};
const mockPlayer = {
  queuePlaylist: jest.fn(),
  setPreviousPlaylist: jest.fn(),
  pause: jest.fn(),
  next: jest.fn(),
  previous: jest.fn(),
  settings: jest.fn(
    (): PlayerConfig => ({
      autoplay: true,
      enableToucan: true,
      appType: 'responsive',
      appName: 'news-portuguese',
      ui: {},
      statsObject: {},
    }),
  ),
  playlist: jest.fn(() => ({
    title: blocks[0].model.video.title,
    items: [{ versionID: blocks[0].model.video.version.id }],
  })),
} satisfies Partial<Player>;

const getMediaProps = () => {
  const { calls } = mockMediaLoader.mock;
  return calls[calls.length - 1][0];
};

const emit = async (event: MediaPlayerEvents, data: SMPEvent = {}) => {
  const handler = getMediaProps().eventMapping?.[event];
  if (!handler) throw new Error(`Missing SMP event handler: ${event}`);

  await act(async () => {
    await handler(data);
  });
};

const renderModal = (props: Partial<PortraitVideoModalProps> = {}) =>
  render(
    <Component
      blocks={blocks}
      selectedVideoIndex={0}
      onClose={mockClose}
      eventTrackingData={eventTrackingData}
      {...props}
    />,
    { service: 'portuguese' },
  );

describe('PortraitVideoModal playback summaries', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(useViewTracker).mockReturnValue({});
    jest.mocked(useSwipeTracker).mockImplementation(trackingData => {
      const tracker =
        trackingData?.componentName === 'portrait-video-playback'
          ? mockPlaybackTracker
          : mockSwipeTracker;

      // Tracking hooks can return a new callback when page analytics update.
      return (data: EventTrackingData) => tracker(data);
    });
    Object.defineProperty(window, 'embeddedMedia', {
      writable: true,
      value: { api: { players: () => ({ bbcMediaPlayer0: mockPlayer }) } },
    });
  });

  it('reports the furthest SMP playhead with the video and carousel context', async () => {
    renderModal();

    await emit('playing');
    await emit('timeupdate', { currentTime: 35, duration: 100 });
    await emit('significanttimeupdate', { currentTime: 20, duration: 100 });
    fireEvent.click(screen.getByTestId('close-modal-button'));

    expect(mockPlaybackTracker).toHaveBeenCalledTimes(1);
    expect(mockPlaybackTracker).toHaveBeenCalledWith({
      componentName: 'portrait-video-playback',
      eventGroupingName: 'portrait-video-playback',
      alwaysInView: true,
      groupTracker: {
        ...eventTrackingData.groupTracker,
        type: 'portrait-video-modal',
      },
      itemTracker: {
        type: 'portrait-video',
        text: blocks[0].model.video.title,
        mediaType: 'video',
        position: 1,
        watchedDuration: 35000,
        totalDuration: 100000,
        completionRate: 0.35,
        skipRate: 0.65,
        playbackTrigger: 'close',
        versionId: blocks[0].model.video.version.id,
        resourceId: blocks[0].model.video.id,
      },
    });
  });

  it.each(['escape', 'backdrop', 'hidden close button', 'fullscreen exit'])(
    'summarises playback when closing via %s',
    async closeMethod => {
      renderModal();
      await emit('timeupdate', { currentTime: 30, duration: 150 });

      if (closeMethod === 'escape') {
        fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
      } else if (closeMethod === 'backdrop') {
        fireEvent.mouseDown(screen.getByRole('dialog'));
      } else if (closeMethod === 'hidden close button') {
        fireEvent.click(screen.getByTestId('close-modal-visually-hidden'));
      } else {
        await emit('fullscreenExit');
      }

      expect(mockPlaybackTracker).toHaveBeenCalledTimes(1);
      expect(mockPlaybackTracker).toHaveBeenCalledWith(
        expect.objectContaining({
          itemTracker: expect.objectContaining({
            watchedDuration: 30000,
            completionRate: 0.2,
            playbackTrigger:
              closeMethod === 'fullscreen exit' ? 'fullscreen-exit' : 'close',
          }),
        }),
      );
    },
  );

  it.each(['swipe', 'wheel', 'button'] as const)(
    'summarises the old video and starts a fresh session after %s navigation',
    async method => {
      renderModal();
      await emit('timeupdate', { currentTime: 30, duration: 150 });

      if (method === 'button') {
        fireEvent.click(screen.getByTestId('next-video-button'));
      } else {
        await emit('statsNavigation', {
          direction: 'next',
          method,
          playlist: {
            items: [{ versionID: blocks[0].model.video.version.id }],
          },
        });
      }
      await emit('playlistLoaded', {
        playlist: {
          items: [{ versionID: blocks[1].model.video.version.id }],
        },
      });
      await emit('timeupdate', { currentTime: 15, duration: 165 });
      fireEvent.click(screen.getByTestId('close-modal-button'));

      expect(
        mockPlaybackTracker.mock.calls.map(([data]) => data.itemTracker),
      ).toEqual([
        expect.objectContaining({
          position: 1,
          watchedDuration: 30000,
          playbackTrigger: 'navigation',
        }),
        expect.objectContaining({
          position: 2,
          watchedDuration: 15000,
          playbackTrigger: 'close',
        }),
      ]);
    },
  );

  it.each([false, undefined])(
    'keeps a paused session until close when ended is %s',
    async ended => {
      renderModal();
      await emit('playing');
      await emit('timeupdate', { currentTime: 20, duration: 100 });
      await emit('pause', { ended, currentTime: 25, duration: 100 });

      expect(mockPlaybackTracker).not.toHaveBeenCalled();
      expect(mockSwipeTracker).not.toHaveBeenCalled();

      fireEvent.click(screen.getByTestId('close-modal-button'));

      expect(mockPlaybackTracker).toHaveBeenCalledTimes(1);
      expect(mockPlaybackTracker).toHaveBeenCalledWith(
        expect.objectContaining({
          itemTracker: expect.objectContaining({
            watchedDuration: 25000,
            completionRate: 0.25,
            playbackTrigger: 'close',
          }),
        }),
      );
    },
  );

  it('does not report a video which never started', () => {
    renderModal();

    fireEvent.click(screen.getByTestId('close-modal-button'));

    expect(mockPlaybackTracker).not.toHaveBeenCalled();
  });

  it('does not turn component teardown into a playback summary', async () => {
    const { unmount } = renderModal();
    await emit('timeupdate', { currentTime: 20, duration: 100 });

    unmount();

    expect(mockPlaybackTracker).not.toHaveBeenCalled();
  });

  it.each(['ended first', 'pause first'])(
    'sends one completion summary and one autoplay view when %s',
    async order => {
      renderModal();
      await emit('timeupdate', { currentTime: 90, duration: 100 });

      const events: MediaPlayerEvents[] =
        order === 'ended first' ? ['ended', 'pause'] : ['pause', 'ended'];
      await emit(events[0], { ended: true, duration: 100 });
      await emit(events[1], { ended: true, duration: 100 });
      fireEvent.click(screen.getByTestId('close-modal-button'));

      expect(mockPlaybackTracker).toHaveBeenCalledTimes(1);
      expect(mockPlaybackTracker).toHaveBeenCalledWith(
        expect.objectContaining({
          itemTracker: expect.objectContaining({
            watchedDuration: 100000,
            completionRate: 1,
            skipRate: 0,
            playbackTrigger: 'ended',
          }),
        }),
      );
      expect(mockSwipeTracker).toHaveBeenCalledTimes(1);
    },
  );

  it('does not report twice when fullscreen exit also follows close', async () => {
    renderModal();
    await emit('timeupdate', { currentTime: 20, duration: 100 });

    fireEvent.click(screen.getByTestId('close-modal-button'));
    await emit('fullscreenExit');

    expect(mockPlaybackTracker).toHaveBeenCalledTimes(1);
  });

  it('preserves player inputs and progress when analytics and close callbacks change', async () => {
    const { rerender } = renderModal();
    const initialMediaProps = getMediaProps();
    const updatedClose = jest.fn();
    const updatedTrackingData = {
      ...eventTrackingData,
      groupTracker: { name: 'Updated carousel', position: 3 },
    };
    await emit('timeupdate', { currentTime: 40, duration: 100 });

    rerender(
      <Component
        blocks={blocks}
        selectedVideoIndex={0}
        onClose={updatedClose}
        eventTrackingData={updatedTrackingData}
      />,
    );

    expect(getMediaProps().blocks).toBe(initialMediaProps.blocks);
    expect(getMediaProps().eventMapping).toBe(initialMediaProps.eventMapping);
    expect(getMediaProps().withinFullscreenContainer).toBe(true);
    expect(mockPlayer.pause).not.toHaveBeenCalled();

    fireEvent.click(screen.getByTestId('close-modal-button'));

    expect(mockPlaybackTracker).toHaveBeenCalledTimes(1);
    expect(mockPlaybackTracker).toHaveBeenCalledWith(
      expect.objectContaining({
        groupTracker: expect.objectContaining(updatedTrackingData.groupTracker),
        itemTracker: expect.objectContaining({ watchedDuration: 40000 }),
      }),
    );
    expect(updatedClose).toHaveBeenCalledTimes(1);
    expect(mockClose).not.toHaveBeenCalled();
  });
});
