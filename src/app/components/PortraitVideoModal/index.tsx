import { Global } from '@emotion/react';
import { use, useCallback, useEffect, useMemo, useRef } from 'react';
import moment from 'moment-timezone';
import MediaLoader from '#app/components/MediaLoader';
import {
  EventMapping,
  Player,
  Playlist,
  PlaylistItem,
  PortraitClipMediaBlock,
  SMPEvent,
} from '#app/components/MediaLoader/types';
import { navigationIcons } from '#psammead/psammead-assets/src/svgs';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import useViewTracker from '../../hooks/useViewTracker';
import useSwipeTracker from '../../hooks/useSwipeTracker';
import styles from './index.styles';
import VisuallyHiddenText from '../VisuallyHiddenText';
import { DownArrowIcon, UpArrowIcon } from '../icons';

const PLAYBACK_SUMMARY_COMPONENT_NAME = 'portrait-video-playback';

type PlaybackSummaryTrigger =
  | 'navigation'
  | 'ended'
  | 'close'
  | 'fullscreen-exit';

type PlayedRange = [number, number];
type ActiveVideoSession = {
  index: number;
  video: PortraitClipMediaBlock['model']['video'];
  duration: number;
  ranges: PlayedRange[];
  position: number | null;
  playing: boolean;
};

const getMillisecondsFromSmpTime = (seconds?: number) =>
  seconds != null && Number.isFinite(seconds) && seconds >= 0
    ? seconds * 1000
    : null;

// Count overlapping/replayed sections once, and leave seek gaps unplayed.
const addPlayedRange = (
  ranges: PlayedRange[],
  range: PlayedRange,
): PlayedRange[] =>
  [...ranges, range]
    .sort(([start], [otherStart]) => start - otherStart)
    .reduce<PlayedRange[]>((merged, [start, end]) => {
      const previous = merged[merged.length - 1];
      return previous && start <= previous[1]
        ? [...merged.slice(0, -1), [previous[0], Math.max(previous[1], end)]]
        : [...merged, [start, end]];
    }, []);

type ModalTrackingParameters = {
  eventTrackingData: EventTrackingData;
  selectedVideo: PortraitClipMediaBlock;
  selectedVideoIndex: number;
};

const getEventTrackingData = ({
  eventTrackingData,
  selectedVideo,
  selectedVideoIndex,
}: ModalTrackingParameters) => {
  const {
    id,
    title,
    version: { duration },
  } = selectedVideo.model.video;

  return {
    componentName: 'portrait-video-modal',
    alwaysInView: true,
    groupTracker: {
      ...eventTrackingData.groupTracker,
      type: 'portrait-video-modal',
    },
    itemTracker: {
      type: 'portrait-video',
      text: title,
      mediaType: 'video',
      position: selectedVideoIndex + 1,
      duration: moment.duration(duration).asMilliseconds(),
      resourceId: id,
    },
  };
};

const findPlayerKey = (): string => {
  const playerInstances = window?.embeddedMedia?.api?.players();
  const modalPlayerId = document.querySelector(
    '#portrait-video-modal-container .media-player',
  )?.id;
  if (modalPlayerId && playerInstances?.[modalPlayerId]) return modalPlayerId;
  const keys = playerInstances ? Object.keys(playerInstances) : [];
  // media loader can create multiple smp instances so use the newest one
  return keys[keys.length - 1] || 'bbcMediaPlayer0';
};

export const getPlayerInstance = () => {
  const playerKey = findPlayerKey();

  return window?.embeddedMedia?.api?.players()?.[playerKey] as Player;
};

const getAllPlayerInstances = () => {
  const playerInstances = window?.embeddedMedia?.api?.players();
  if (!playerInstances) return [];

  return Object.values(playerInstances);
};

const getCurrentIndex = ({
  e,
  blocks,
  player,
}: {
  e?: SMPEvent;
  blocks: PortraitClipMediaBlock[];
  player?: Player;
}): number => {
  const playlist = (e?.playlist || player?.playlist() || {}) as Playlist;
  const [currentItem] = (playlist?.items || []) as PlaylistItem[];
  const currentId = currentItem?.vpid || currentItem?.versionID;

  const currentIndex = blocks?.findIndex(
    item =>
      item.model.video.id === currentId ||
      item.model.video.version.id === currentId,
  );

  return currentIndex;
};

export const playlistLoadedCallback = (
  e: SMPEvent,
  blocks: PortraitClipMediaBlock[],
) => {
  const player = getPlayerInstance();

  if (!player) return;

  const allPlayerInstances = getAllPlayerInstances();

  // Pause embedded players when PV Carousel is loaded
  if (allPlayerInstances) {
    allPlayerInstances.forEach(playerInstance => {
      playerInstance.pause();
    });
  }

  const currentIndex = getCurrentIndex({ e, blocks });

  const prevVideoButton = document.getElementById('previous-video-button');
  const nextVideoButton = document.getElementById('next-video-button');

  // Handle disabling buttons based on current index
  if (currentIndex === 0) {
    prevVideoButton?.setAttribute('disabled', 'true');
    nextVideoButton?.removeAttribute('disabled');
  } else if (currentIndex === blocks.length - 1) {
    prevVideoButton?.removeAttribute('disabled');
    nextVideoButton?.setAttribute('disabled', 'true');
  } else {
    prevVideoButton?.removeAttribute('disabled');
    nextVideoButton?.removeAttribute('disabled');
  }

  const previous = blocks?.[currentIndex - 1]?.model;
  const next = blocks?.[currentIndex + 1]?.model;

  if (previous) {
    player.setPreviousPlaylist(
      {
        title: previous?.video?.title ?? '',
        holdingImageURL: previous?.video?.holdingImageURL ?? '',
        items: [{ versionID: previous?.video?.version?.id }],
      },
      { statsObject: { clipPID: previous?.video?.id } },
    );
  }

  if (next) {
    player.queuePlaylist(
      {
        title: next?.video?.title ?? '',
        holdingImageURL: next?.video?.holdingImageURL ?? '',
        items: [{ versionID: next?.video?.version?.id }],
      },
      { statsObject: { clipPID: next?.video?.id } },
    );
  }
};

export const statsNavigationCallback = async (
  e: SMPEvent,
  blocks: PortraitClipMediaBlock[],
  eventTrackingData: EventTrackingData,
  swipeTracker: ReturnType<typeof useSwipeTracker>,
) => {
  const { direction, method } = e || {};

  const isSupportedNavigation = method && ['swipe', 'wheel'].includes(method);

  if (isSupportedNavigation) {
    const currentIndex = getCurrentIndex({ e, blocks });

    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    const selectedVideo = blocks?.[newIndex];

    if (!selectedVideo) return;

    const newEventTrackingData = getEventTrackingData({
      eventTrackingData,
      selectedVideo,
      selectedVideoIndex: newIndex,
    });

    await swipeTracker(newEventTrackingData);
  }
};

export const playbackEndedCallback = async (
  e: SMPEvent,
  blocks: PortraitClipMediaBlock[],
  eventTrackingData: EventTrackingData,
  swipeTracker: ReturnType<typeof useSwipeTracker>,
) => {
  if (e?.ended !== true) return;

  const player = getPlayerInstance();
  const autoplay = Boolean(player?.settings?.().autoplay);

  if (player && autoplay) {
    const currentIndex = getCurrentIndex({ blocks, player });

    const newIndex = currentIndex + 1;
    const selectedVideo = blocks?.[newIndex];

    if (!selectedVideo) return;

    const newEventTrackingData = getEventTrackingData({
      eventTrackingData,
      selectedVideo,
      selectedVideoIndex: newIndex,
    });

    await swipeTracker(newEventTrackingData);
  }
};

const pluginLoadedCallback = () => {
  const player = getPlayerInstance();
  player.dispatchEvent('fullScreenPlugin.launchFullscreen');
};

export interface PortraitVideoModalProps {
  blocks: PortraitClipMediaBlock[];
  onClose: () => void;
  selectedVideoIndex: number;
  nonce?: string | null;
  eventTrackingData: EventTrackingData;
}

const PortraitVideoModal = ({
  blocks,
  onClose,
  selectedVideoIndex,
  eventTrackingData,
}: PortraitVideoModalProps) => {
  const {
    translations: {
      media: {
        closeVideo = 'Close',
        modalLabel = 'Media player',
        endOfContentClose = 'End of content. Close',
      },
    },
  } = use(ServiceContext);

  const viewTracker = useViewTracker(
    getEventTrackingData({
      eventTrackingData,
      selectedVideo: blocks?.[selectedVideoIndex],
      selectedVideoIndex,
    }),
  );

  const swipeTracker = useSwipeTracker(
    getEventTrackingData({
      eventTrackingData,
      selectedVideo: blocks?.[selectedVideoIndex],
      selectedVideoIndex,
    }),
  );
  const playbackSummaryTracker = useSwipeTracker({
    ...eventTrackingData,
    componentName: PLAYBACK_SUMMARY_COMPONENT_NAME,
    alwaysInView: true,
  });
  const trackingRef = useRef({
    playbackSummaryTracker,
    eventTrackingData,
    swipeTracker,
    onClose,
  });
  trackingRef.current = {
    playbackSummaryTracker,
    eventTrackingData,
    swipeTracker,
    onClose,
  };
  const activeVideoSessionRef = useRef<ActiveVideoSession | null>(null);

  useEffect(
    () => () => {
      // Teardown alone is not evidence that a video was consumed.
      activeVideoSessionRef.current = null;
    },
    [],
  );

  const playback = useMemo(() => {
    const videoIndex = (event?: SMPEvent) => {
      const [item] = ((event?.playlist || getPlayerInstance()?.playlist?.())
        ?.items || []) as PlaylistItem[];
      const id = item?.vpid || item?.versionID;
      return blocks.findIndex(
        block =>
          block.model.video.version.id === id || block.model.video.id === id,
      );
    };

    const currentSession = (event?: SMPEvent) => {
      const session = activeVideoSessionRef.current;
      return session &&
        blocks[videoIndex(event)]?.model.video.version.id ===
          session.video.version.id &&
        blocks[videoIndex()]?.model.video.version.id ===
          session.video.version.id
        ? session
        : null;
    };

    const sample = (event?: SMPEvent) => {
      const session = currentSession(event);
      const player = getPlayerInstance();
      if (!session || !player) return;

      // Pause/ended payloads have no position. Prefer the current player over
      // queued event data, which may belong to an earlier seek or playlist.
      const position = getMillisecondsFromSmpTime(
        player.currentTime?.() ?? event?.currentTime,
      );
      const duration = getMillisecondsFromSmpTime(
        player.duration?.() ?? event?.duration,
      );
      if (duration != null && duration > 0) session.duration = duration;

      if (player.seeking?.() || position == null) {
        session.position = null;
        return;
      }

      if (
        session.playing &&
        session.position != null &&
        position > session.position
      ) {
        session.ranges = addPlayedRange(session.ranges, [
          session.position,
          position,
        ]);
      }
      session.position = position;
    };

    const finish = (trigger: PlaybackSummaryTrigger, event?: SMPEvent) => {
      sample(event);
      const session = activeVideoSessionRef.current;
      activeVideoSessionRef.current = null;
      if (
        !session ||
        !Number.isFinite(session.duration) ||
        session.duration <= 0
      )
        return;

      const watchedDuration = session.ranges.reduce(
        (total, [start, end]) =>
          total + Math.max(0, Math.min(end, session.duration) - start),
        0,
      );
      const completionRate = Number(
        (
          Math.min(watchedDuration, session.duration) / session.duration
        ).toFixed(4),
      );
      const { video } = session;
      const tracking = trackingRef.current;

      tracking
        .playbackSummaryTracker({
          ...tracking.eventTrackingData,
          componentName: PLAYBACK_SUMMARY_COMPONENT_NAME,
          eventGroupingName: PLAYBACK_SUMMARY_COMPONENT_NAME,
          alwaysInView: true,
          groupTracker: {
            ...tracking.eventTrackingData.groupTracker,
            type: 'portrait-video-modal',
          },
          itemTracker: {
            type: 'portrait-video',
            text: video.title,
            mediaType: 'video',
            position: session.index + 1,
            watchedDuration,
            totalDuration: session.duration,
            completionRate,
            skipRate: Number((1 - completionRate).toFixed(4)),
            playbackTrigger: trigger,
            versionId: video.version.id,
            resourceId: video.id,
          },
        })
        .catch(() => undefined);
    };

    const ended = (event: SMPEvent) => {
      // A stale/initial ended signal cannot create or complete a new session.
      if (
        event.ended === false ||
        !getPlayerInstance()?.ended?.() ||
        !currentSession(event)
      )
        return;
      finish('ended', event);
    };

    const suspend = (event: SMPEvent) => {
      sample(event);
      const session = currentSession(event);
      if (session) session.playing = false;
    };

    return {
      finish,
      playlistLoaded: (event: SMPEvent) => {
        const index = videoIndex(event);
        if (index < 0 || index !== videoIndex()) return;
        if (
          activeVideoSessionRef.current &&
          blocks[index].model.video.version.id !==
            activeVideoSessionRef.current.video.version.id
        )
          finish('navigation');
      },
      playing: (event: SMPEvent) => {
        const index = videoIndex(event);
        const player = getPlayerInstance();
        if (index < 0 || index !== videoIndex() || !player || player.ended?.())
          return;
        if (
          activeVideoSessionRef.current &&
          activeVideoSessionRef.current.video.version.id !==
            blocks[index].model.video.version.id
        )
          finish('navigation');
        if (!activeVideoSessionRef.current) {
          activeVideoSessionRef.current = {
            index,
            video: blocks[index].model.video,
            duration: moment
              .duration(blocks[index].model.video.version.duration)
              .asMilliseconds(),
            ranges: [],
            position: null,
            playing: false,
          };
        }
        sample(event);
        activeVideoSessionRef.current.playing = true;
      },
      timeupdate: sample,
      seeking: (event: SMPEvent) => {
        const session = currentSession(event);
        if (session) {
          session.position = null;
          session.playing = false;
        }
      },
      seeked: (event: SMPEvent) => {
        const session = currentSession(event);
        if (session) {
          session.position = null;
          sample(event);
          session.playing = !getPlayerInstance()?.paused?.();
        }
      },
      waiting: suspend,
      pause: (event: SMPEvent) => {
        if (event.ended === true) ended(event);
        else suspend(event);
      },
      ended,
    };
  }, [blocks]);

  useEffect(() => {
    const pageHide = () => playback.finish('close');
    const pageShow = (event: PageTransitionEvent) => {
      const player = getPlayerInstance();
      if (event.persisted && player && !player.paused() && !player.ended())
        playback.playing({});
    };
    window.addEventListener('pagehide', pageHide);
    window.addEventListener('pageshow', pageShow);
    return () => {
      window.removeEventListener('pagehide', pageHide);
      window.removeEventListener('pageshow', pageShow);
    };
  }, [playback]);

  // Unrelated page updates must not reload the playing video.
  const selectedBlocks = useMemo(
    () => [blocks[selectedVideoIndex]],
    [blocks, selectedVideoIndex],
  );

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const endOfContentButtonRef = useRef<HTMLButtonElement>(null);
  const modalHasClosedRef = useRef(false);

  const handleModalClose = useCallback(
    (trigger: Extract<PlaybackSummaryTrigger, 'close' | 'fullscreen-exit'>) => {
      if (modalHasClosedRef.current) return;
      modalHasClosedRef.current = true;
      playback.finish(trigger);
      trackingRef.current.onClose();
    },
    [playback],
  );

  const eventMapping = useMemo<EventMapping>(
    () => ({
      playlistLoaded: event => {
        if (modalHasClosedRef.current) return;
        playback.playlistLoaded(event);
        playlistLoadedCallback(event, blocks);
      },
      pluginLoaded: pluginLoadedCallback,
      fullscreenExit: () => handleModalClose('fullscreen-exit'),
      statsNavigation: event =>
        statsNavigationCallback(
          event,
          blocks,
          trackingRef.current.eventTrackingData,
          trackingRef.current.swipeTracker,
        ),
      pause: event => {
        playback.pause(event);
        playbackEndedCallback(
          event,
          blocks,
          trackingRef.current.eventTrackingData,
          trackingRef.current.swipeTracker,
        );
      },
      ended: playback.ended,
      playing: event => {
        if (!modalHasClosedRef.current) playback.playing(event);
      },
      timeupdate: playback.timeupdate,
      significanttimeupdate: playback.timeupdate,
      seeking: playback.seeking,
      seeked: playback.seeked,
      waiting: playback.waiting,
    }),
    [blocks, handleModalClose, playback],
  );

  const handlePrevNextVideo = useCallback((direction: 'previous' | 'next') => {
    const player = getPlayerInstance();

    if (!player) {
      return;
    }

    player[direction]();
  }, []);

  useEffect(() => {
    const handleBackdropClick = (event: MouseEvent | TouchEvent) => {
      if (event.target === event.currentTarget) {
        handleModalClose('close');
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleModalClose('close');
      }
      // - Tab/Shift+Tab loops focus between the close button and the end-of-content button
      if (event.key === 'Tab') {
        if (
          document.activeElement === closeButtonRef.current &&
          event.shiftKey
        ) {
          event.preventDefault();
          endOfContentButtonRef.current?.focus();
        } else if (
          document.activeElement === endOfContentButtonRef.current &&
          !event.shiftKey
        ) {
          event.preventDefault();
          closeButtonRef.current?.focus();
        }
      }
    };

    const modal = document.getElementById('portrait-video-modal-container');
    const reactRootElement = document.getElementById('root');

    if (modal) {
      closeButtonRef.current?.focus();
      // prevent tabbing to elements outside the modal
      reactRootElement?.setAttribute('inert', 'true');
      modal.addEventListener('mousedown', handleBackdropClick);
      modal.addEventListener('touchstart', handleBackdropClick);
      modal.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      reactRootElement?.removeAttribute('inert');
      modal?.removeEventListener('mousedown', handleBackdropClick);
      modal?.removeEventListener('touchstart', handleBackdropClick);
      modal?.removeEventListener('keydown', handleKeyDown);

      const allPlayerInstances = getAllPlayerInstances();

      allPlayerInstances.forEach(player => {
        player.pause();
      });
    };
  }, [handleModalClose]);

  return (
    <>
      <Global styles={styles.bodyOverflowHidden} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={modalLabel}
        css={styles.modal}
        id="portrait-video-modal-container"
        {...viewTracker}
      >
        <button
          ref={closeButtonRef}
          type="button"
          data-testid="close-modal-button"
          css={styles.closeButton}
          className="focusIndicatorInvert"
          onClick={() => handleModalClose('close')}
        >
          {navigationIcons.cross}
          <VisuallyHiddenText>{closeVideo}</VisuallyHiddenText>
        </button>
        {/* Navigation Buttons */}
        <div css={styles.navButtonColumn}>
          <button
            id="previous-video-button"
            type="button"
            onClick={() => handlePrevNextVideo('previous')}
            css={styles.navButton}
            aria-label="Previous video"
            data-testid="previous-video-button"
            className="focusIndicatorInvert"
          >
            <UpArrowIcon />
          </button>
          <button
            id="next-video-button"
            type="button"
            onClick={() => handlePrevNextVideo('next')}
            css={styles.navButton}
            aria-label="Next video"
            data-testid="next-video-button"
            className="focusIndicatorInvert"
          >
            <DownArrowIcon />
          </button>
        </div>
        <MediaLoader
          css={styles.mediaWrapper}
          blocks={selectedBlocks}
          withinFullscreenContainer
          eventMapping={eventMapping}
        />
        <button
          ref={endOfContentButtonRef}
          type="button"
          data-testid="close-modal-visually-hidden"
          css={styles.visuallyHiddenCloseButton}
          onClick={() => handleModalClose('close')}
          className="focusIndicatorInvert"
          aria-label="End of content. Close"
        >
          {endOfContentClose}
        </button>
      </div>
    </>
  );
};

export default PortraitVideoModal;
