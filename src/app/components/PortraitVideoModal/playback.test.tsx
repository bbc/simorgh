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

const playerState = {
  currentTime: 0,
  duration: 100,
  paused: true,
  seeking: false,
  ended: false,
  videoIndex: 0,
};

const getPlaylist = (index = playerState.videoIndex) => ({
  title: blocks[index].model.video.title,
  items: [{ versionID: blocks[index].model.video.version.id }],
});

const mockPlayer = {
  currentTime: jest.fn(() => playerState.currentTime),
  duration: jest.fn(() => playerState.duration),
  paused: jest.fn(() => playerState.paused),
  seeking: jest.fn(() => playerState.seeking),
  ended: jest.fn(() => playerState.ended),
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
  playlist: jest.fn(() => getPlaylist()),
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

const play = async () => {
  playerState.paused = false;
  playerState.ended = false;
  // SMP's playing event has no currentTime or duration fields.
  await emit('playing');
};

const progressTo = async (currentTime: number) => {
  playerState.currentTime = currentTime;
  await emit('timeupdate', { currentTime, duration: playerState.duration });
};

const pause = async () => {
  playerState.paused = true;
  // SMP's pause event reports ended but not currentTime or duration.
  await emit('pause', { ended: playerState.ended });
};

const seekTo = async (currentTime: number) => {
  playerState.seeking = true;
  await emit('seeking', {
    currentTime: playerState.currentTime,
    duration: playerState.duration,
  });
  await progressTo(currentTime);
  playerState.seeking = false;
  await emit('seeked', { currentTime, duration: playerState.duration });
};

const finish = async () => {
  playerState.ended = true;
  playerState.paused = true;
  // SMP's ended event has no currentTime or duration fields.
  await emit('ended');
};

const close = () => fireEvent.click(screen.getByTestId('close-modal-button'));
const summaryItems = () =>
  mockPlaybackTracker.mock.calls.map(([data]) => data.itemTracker);

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
    Object.assign(playerState, {
      currentTime: 0,
      duration: 100,
      paused: true,
      seeking: false,
      ended: false,
      videoIndex: 0,
    });
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

  it('reports played duration with video and carousel context when closing', async () => {
    renderModal();
    await play();
    await progressTo(10);
    await progressTo(20);
    // Closing must include playback since the most recent timeupdate.
    playerState.currentTime = 25;

    close();

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
        watchedDuration: 25000,
        totalDuration: 100000,
        completionRate: 0.25,
        skipRate: 0.75,
        playbackTrigger: 'close',
        versionId: blocks[0].model.video.version.id,
        resourceId: blocks[0].model.video.id,
      },
    });
  });

  it.each(['ended', 'pause'] as const)(
    'ignores a startup %s event before playback begins',
    async event => {
      renderModal();
      playerState.ended = true;
      await emit(event, event === 'pause' ? { ended: true } : {});

      expect(mockPlaybackTracker).not.toHaveBeenCalled();

      // An initial signal must not destroy the session that then starts.
      await play();
      await progressTo(10);
      close();
      expect(summaryItems()).toEqual([
        expect.objectContaining({
          watchedDuration: 10000,
          completionRate: 0.1,
        }),
      ]);
    },
  );

  it('does not treat progress updates or a seek before playing as a play', async () => {
    renderModal();
    await seekTo(40);
    await progressTo(40);

    close();

    expect(mockPlaybackTracker).not.toHaveBeenCalled();
  });

  it('records zero coverage when a genuinely started play is closed immediately', async () => {
    renderModal();
    await play();

    close();

    expect(summaryItems()).toEqual([
      expect.objectContaining({
        watchedDuration: 0,
        completionRate: 0,
        skipRate: 1,
      }),
    ]);
  });

  it('records zero coverage when a started video is immediately sought to the end', async () => {
    renderModal();
    await play();
    await seekTo(100);

    await finish();

    expect(summaryItems()).toEqual([
      expect.objectContaining({
        watchedDuration: 0,
        completionRate: 0,
        skipRate: 1,
        playbackTrigger: 'ended',
      }),
    ]);
  });

  it('counts only the final ten seconds when playback starts after an initial seek', async () => {
    renderModal();
    await seekTo(90);
    await play();
    await progressTo(95);
    playerState.currentTime = 100;

    await finish();

    expect(summaryItems()).toEqual([
      expect.objectContaining({
        watchedDuration: 10000,
        completionRate: 0.1,
        skipRate: 0.9,
        playbackTrigger: 'ended',
      }),
    ]);
  });

  it('omits a summary when a loaded video never reaches playing', async () => {
    renderModal();
    await emit('playlistLoaded', { playlist: getPlaylist() });
    await pause();

    close();

    expect(mockPlaybackTracker).not.toHaveBeenCalled();
  });

  it.each([0.5, 2])(
    'measures played content positions at %sx speed without rescaling the duration',
    async playbackRate => {
      renderModal();
      await play();
      act(() => jest.advanceTimersByTime(10000 / playbackRate));
      await progressTo(10);
      act(() => jest.advanceTimersByTime(10000 / playbackRate));
      await progressTo(20);

      close();

      expect(summaryItems()).toEqual([
        expect.objectContaining({
          watchedDuration: 20000,
          completionRate: 0.2,
        }),
      ]);
    },
  );

  it.each(['escape', 'backdrop', 'hidden close button', 'fullscreen exit'])(
    'summarises playback once when closing via %s',
    async closeMethod => {
      renderModal();
      await play();
      await progressTo(20);

      if (closeMethod === 'escape') {
        fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
      } else if (closeMethod === 'backdrop') {
        fireEvent.mouseDown(screen.getByRole('dialog'));
      } else if (closeMethod === 'hidden close button') {
        fireEvent.click(screen.getByTestId('close-modal-visually-hidden'));
      } else {
        await emit('fullscreenExit');
      }

      expect(summaryItems()).toEqual([
        expect.objectContaining({
          watchedDuration: 20000,
          completionRate: 0.2,
          playbackTrigger:
            closeMethod === 'fullscreen exit' ? 'fullscreen-exit' : 'close',
        }),
      ]);
    },
  );

  it.each(['swipe', 'wheel', 'button'] as const)(
    'summarises the old video and starts a fresh session after %s navigation',
    async method => {
      renderModal();
      await play();
      await progressTo(30);

      if (method === 'button') {
        fireEvent.click(screen.getByTestId('next-video-button'));
      } else {
        await emit('statsNavigation', {
          direction: 'next',
          method,
          playlist: getPlaylist(0),
        });
      }
      Object.assign(playerState, {
        videoIndex: 1,
        currentTime: 0,
        duration: 200,
        paused: true,
      });
      await emit('playlistLoaded', { playlist: getPlaylist() });
      await play();
      await progressTo(20);
      close();

      expect(summaryItems()).toEqual([
        expect.objectContaining({
          position: 1,
          watchedDuration: 30000,
          playbackTrigger: 'navigation',
        }),
        expect.objectContaining({
          position: 2,
          watchedDuration: 20000,
          totalDuration: 200000,
          completionRate: 0.1,
          playbackTrigger: 'close',
        }),
      ]);
    },
  );

  it('keeps pause and resume within one session and reads the pause position from SMP', async () => {
    renderModal();
    await play();
    await progressTo(10);
    playerState.currentTime = 15;
    await pause();

    expect(mockPlaybackTracker).not.toHaveBeenCalled();
    expect(mockSwipeTracker).not.toHaveBeenCalled();

    await play();
    await progressTo(20);
    close();

    expect(summaryItems()).toEqual([
      expect.objectContaining({ watchedDuration: 20000, completionRate: 0.2 }),
    ]);
  });

  it('does not count a forward seek while paused as played content', async () => {
    renderModal();
    await play();
    await progressTo(10);
    await pause();
    await seekTo(90);

    close();

    expect(summaryItems()).toEqual([
      expect.objectContaining({ watchedDuration: 10000, completionRate: 0.1 }),
    ]);
  });

  it('does not accumulate timeupdate positions while playback is paused', async () => {
    renderModal();
    await play();
    await progressTo(10);
    await pause();
    await progressTo(30);

    close();

    expect(summaryItems()).toEqual([
      expect.objectContaining({ watchedDuration: 10000, completionRate: 0.1 }),
    ]);
  });

  it('does not count a seek jump when pause arrives before the seeking event', async () => {
    renderModal();
    await play();
    await progressTo(10);
    // SMP can update its currentTime and seeking state before dispatching pause.
    playerState.currentTime = 90;
    playerState.seeking = true;
    await pause();
    await seekTo(90);

    close();

    expect(summaryItems()).toEqual([
      expect.objectContaining({ watchedDuration: 10000, completionRate: 0.1 }),
    ]);
  });

  it('continues a playing session after seeked without requiring another playing event', async () => {
    renderModal();
    await play();
    await progressTo(10);
    await seekTo(90);
    await progressTo(95);

    close();

    expect(summaryItems()).toEqual([
      expect.objectContaining({ watchedDuration: 15000, completionRate: 0.15 }),
    ]);
  });

  it.each([false, true])(
    'counts only played intervals when seeking ahead and finishing (paused during seek: %s)',
    async pausedDuringSeek => {
      renderModal();
      await play();
      await progressTo(10);
      if (pausedDuringSeek) await pause();
      await seekTo(90);
      await play();
      await progressTo(95);
      playerState.currentTime = 100;

      await finish();
      await pause();
      close();

      expect(summaryItems()).toEqual([
        expect.objectContaining({
          watchedDuration: 20000,
          totalDuration: 100000,
          completionRate: 0.2,
          skipRate: 0.8,
          playbackTrigger: 'ended',
        }),
      ]);
    },
  );

  it.each([
    { resumeTo: 8, watchedDuration: 10000 },
    { resumeTo: 15, watchedDuration: 15000 },
  ])(
    'retains the first ten seconds and counts replay overlap once when resuming to $resumeTo',
    async ({ resumeTo, watchedDuration }) => {
      renderModal();
      await play();
      await progressTo(10);
      await pause();
      await seekTo(5);
      await play();
      await progressTo(resumeTo);

      close();

      expect(summaryItems()).toEqual([
        expect.objectContaining({ watchedDuration }),
      ]);
    },
  );

  it('merges disjoint and overlapping watched intervals after several seeks', async () => {
    renderModal();
    await play();
    await progressTo(10);
    await seekTo(30);
    await play();
    await progressTo(40);
    await seekTo(5);
    await play();
    await progressTo(35);

    close();

    expect(summaryItems()).toEqual([
      expect.objectContaining({ watchedDuration: 40000, completionRate: 0.4 }),
    ]);
  });

  it('does not accumulate progress after waiting until playback resumes', async () => {
    renderModal();
    await play();
    await progressTo(10);
    await emit('waiting');
    await progressTo(30);
    await play();
    await progressTo(35);

    close();

    expect(summaryItems()).toEqual([
      expect.objectContaining({ watchedDuration: 15000, completionRate: 0.15 }),
    ]);
  });

  it('ignores an ended signal while SMP still reports ongoing playback', async () => {
    renderModal();
    await play();
    await progressTo(10);
    await emit('ended');

    expect(mockPlaybackTracker).not.toHaveBeenCalled();

    await progressTo(20);
    close();

    expect(summaryItems()).toEqual([
      expect.objectContaining({ watchedDuration: 20000, completionRate: 0.2 }),
    ]);
  });

  it.each(['ended first', 'pause first'])(
    'sends one completion summary and one autoplay view when %s',
    async order => {
      renderModal();
      await play();
      await progressTo(50);
      playerState.currentTime = 100;
      playerState.ended = true;
      playerState.paused = true;

      if (order === 'ended first') {
        await emit('ended');
        await pause();
      } else {
        await pause();
        await emit('ended');
      }
      close();

      expect(summaryItems()).toEqual([
        expect.objectContaining({
          watchedDuration: 100000,
          completionRate: 1,
          skipRate: 0,
          playbackTrigger: 'ended',
        }),
      ]);
      expect(mockSwipeTracker).toHaveBeenCalledTimes(1);
    },
  );

  it('reports full coverage after the whole video plays naturally', async () => {
    renderModal();
    await play();
    await progressTo(25);
    await progressTo(50);
    await progressTo(75);
    await progressTo(100);

    await finish();

    expect(summaryItems()).toEqual([
      expect.objectContaining({
        watchedDuration: 100000,
        completionRate: 1,
        skipRate: 0,
        playbackTrigger: 'ended',
      }),
    ]);
  });

  it('starts another session when the same video is replayed after completion', async () => {
    renderModal();
    await play();
    await progressTo(100);
    await finish();
    playerState.currentTime = 0;
    await play();
    await progressTo(20);

    close();

    expect(summaryItems()).toEqual([
      expect.objectContaining({ completionRate: 1, playbackTrigger: 'ended' }),
      expect.objectContaining({
        completionRate: 0.2,
        playbackTrigger: 'close',
      }),
    ]);
  });

  it('ignores late progress and completion explicitly attributed to the previous video', async () => {
    renderModal();
    await play();
    await progressTo(10);
    Object.assign(playerState, { videoIndex: 1, currentTime: 0, paused: true });
    await emit('playlistLoaded', { playlist: getPlaylist() });
    await play();
    await progressTo(5);
    await emit('timeupdate', {
      currentTime: 100,
      duration: 100,
      playlist: getPlaylist(0),
    });
    await emit('ended', { playlist: getPlaylist(0) });
    await progressTo(10);

    close();

    expect(summaryItems()).toEqual([
      expect.objectContaining({ position: 1, watchedDuration: 10000 }),
      expect.objectContaining({ position: 2, watchedDuration: 10000 }),
    ]);
  });

  it.each([
    { name: 'another carousel video', playlist: getPlaylist(1) },
    {
      name: 'an unknown video',
      playlist: { title: 'Unknown', items: [{ versionID: 'not-in-carousel' }] },
    },
  ])(
    'ignores a playlistLoaded event for $name when SMP is still playing the current video',
    async ({ playlist }) => {
      renderModal();
      await play();
      await progressTo(10);
      await emit('playlistLoaded', { playlist });

      expect(mockPlaybackTracker).not.toHaveBeenCalled();

      await progressTo(20);
      close();

      expect(summaryItems()).toEqual([
        expect.objectContaining({
          watchedDuration: 20000,
          completionRate: 0.2,
        }),
      ]);
    },
  );

  it('keeps watched content attributed to its video when carousel blocks are reordered', async () => {
    const { rerender } = renderModal();
    await play();
    await progressTo(10);
    const reorderedBlocks = [blocks[1], blocks[0], ...blocks.slice(2)];

    rerender(
      <Component
        blocks={reorderedBlocks}
        selectedVideoIndex={1}
        onClose={mockClose}
        eventTrackingData={eventTrackingData}
      />,
    );
    close();

    expect(summaryItems()).toEqual([
      expect.objectContaining({
        resourceId: blocks[0].model.video.id,
        versionId: blocks[0].model.video.version.id,
        text: blocks[0].model.video.title,
        watchedDuration: 10000,
      }),
    ]);
  });

  it('uses a valid player duration when metadata duration is unavailable', async () => {
    const invalidMetadataBlocks = blocks.map(block => ({
      ...block,
      model: {
        ...block.model,
        video: {
          ...block.model.video,
          version: { ...block.model.video.version, duration: '' },
        },
      },
    }));
    renderModal({ blocks: invalidMetadataBlocks });
    await play();
    await progressTo(10);

    close();

    expect(summaryItems()).toEqual([
      expect.objectContaining({ totalDuration: 100000, completionRate: 0.1 }),
    ]);
  });

  it('omits a summary when neither metadata nor SMP provides a valid duration', async () => {
    const invalidMetadataBlocks = blocks.map(block => ({
      ...block,
      model: {
        ...block.model,
        video: {
          ...block.model.video,
          version: { ...block.model.video.version, duration: '' },
        },
      },
    }));
    playerState.duration = Number.NaN;
    renderModal({ blocks: invalidMetadataBlocks });
    await play();
    await progressTo(10);

    close();

    expect(mockPlaybackTracker).not.toHaveBeenCalled();
  });

  it('does not turn component teardown into a playback summary', async () => {
    const { unmount } = renderModal();
    await play();
    await progressTo(20);

    unmount();

    expect(mockPlaybackTracker).not.toHaveBeenCalled();
  });

  it('flushes a departing page once without duplicating a later close', async () => {
    renderModal();
    await play();
    await progressTo(10);
    playerState.currentTime = 15;

    fireEvent(window, new PageTransitionEvent('pagehide', { persisted: true }));
    fireEvent(window, new PageTransitionEvent('pagehide', { persisted: true }));
    close();

    expect(summaryItems()).toEqual([
      expect.objectContaining({
        watchedDuration: 15000,
        completionRate: 0.15,
        playbackTrigger: 'close',
      }),
    ]);
  });

  it('keeps a session open when the document becomes hidden', async () => {
    renderModal();
    await play();
    await progressTo(10);
    const visibility = jest
      .spyOn(document, 'visibilityState', 'get')
      .mockReturnValue('hidden');

    fireEvent(document, new Event('visibilitychange'));
    visibility.mockRestore();

    expect(mockPlaybackTracker).not.toHaveBeenCalled();

    await progressTo(20);
    close();
    expect(summaryItems()).toEqual([
      expect.objectContaining({ watchedDuration: 20000, completionRate: 0.2 }),
    ]);
  });

  it('starts restored playback at its current position without counting the page absence', async () => {
    renderModal();
    await play();
    await progressTo(10);
    fireEvent(window, new PageTransitionEvent('pagehide', { persisted: true }));
    playerState.currentTime = 50;

    fireEvent(window, new PageTransitionEvent('pageshow', { persisted: true }));
    await progressTo(60);
    close();

    expect(summaryItems()).toEqual([
      expect.objectContaining({ watchedDuration: 10000, completionRate: 0.1 }),
      expect.objectContaining({ watchedDuration: 10000, completionRate: 0.1 }),
    ]);
  });

  it('waits for playing after restoring a paused video from the back-forward cache', async () => {
    renderModal();
    await play();
    await progressTo(10);
    await pause();
    fireEvent(window, new PageTransitionEvent('pagehide', { persisted: true }));
    playerState.currentTime = 50;

    fireEvent(window, new PageTransitionEvent('pageshow', { persisted: true }));
    await progressTo(55);
    await play();
    await progressTo(60);
    close();

    expect(summaryItems()).toEqual([
      expect.objectContaining({ watchedDuration: 10000, completionRate: 0.1 }),
      expect.objectContaining({ watchedDuration: 5000, completionRate: 0.05 }),
    ]);
  });

  it('does not report twice when fullscreen exit also follows close', async () => {
    renderModal();
    await play();
    await progressTo(20);

    close();
    await emit('fullscreenExit');

    expect(mockPlaybackTracker).toHaveBeenCalledTimes(1);
  });

  it('ignores late playback events after the modal has closed', async () => {
    renderModal();
    await play();
    await progressTo(20);
    close();

    await play();
    await progressTo(100);
    await finish();
    await emit('fullscreenExit');

    expect(summaryItems()).toEqual([
      expect.objectContaining({
        watchedDuration: 20000,
        playbackTrigger: 'close',
      }),
    ]);
  });

  it('preserves player inputs and progress when analytics and close callbacks change', async () => {
    const { rerender } = renderModal();
    const initialMediaProps = getMediaProps();
    const updatedClose = jest.fn();
    const updatedTrackingData = {
      ...eventTrackingData,
      groupTracker: { name: 'Updated carousel', position: 3 },
    };
    await play();
    await progressTo(40);

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

    close();

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
