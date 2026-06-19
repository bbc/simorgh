import { Global } from '@emotion/react';
import { use, useCallback, useEffect, useRef } from 'react';
import moment from 'moment-timezone';
import MediaLoader from '#app/components/MediaLoader';
import {
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

// groups the custom playback summary separately from modal view and navigation events
const PLAYBACK_SUMMARY_COMPONENT_NAME = 'portrait-video-playback';
const PLAYBACK_SUMMARY_EVENT_GROUPING_NAME = 'portrait-video-playback';

type PlaybackSummaryTrigger =
  | 'navigation'
  | 'ended'
  | 'close'
  | 'fullscreen-exit';

type ActiveVideoSession = {
  index: number;
  hasStartedPlaying: boolean;
  maxPlayedPositionMs: number;
  totalDurationMs: number;
};

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

const isValidVideoIndex = (
  videoIndex: number,
  blocks: PortraitClipMediaBlock[],
) => videoIndex >= 0 && videoIndex < blocks.length;

// metadata duration is the fallback until smp reports the live player duration
const getTotalDurationMs = ({
  videoIndex,
  blocks,
}: {
  videoIndex: number;
  blocks: PortraitClipMediaBlock[];
}) => {
  if (!isValidVideoIndex(videoIndex, blocks)) {
    return 0;
  }

  const totalDurationMs = moment
    .duration(blocks[videoIndex]?.model?.video?.version?.duration)
    .asMilliseconds();

  return Number.isFinite(totalDurationMs) && totalDurationMs > 0
    ? totalDurationMs
    : 0;
};

// smp docs say timeupdate values are in seconds so we normalise to milliseconds here
const getMillisecondsFromSmpTime = (value?: number) => {
  if (!Number.isFinite(value) || value == null || value < 0) {
    return null;
  }

  return value * 1000;
};

// completion and skip are inverse rates so they should add up to 1
const calculatePlaybackSummary = ({
  watchedDurationMs,
  totalDurationMs,
}: {
  watchedDurationMs: number;
  totalDurationMs: number;
}) => {
  const boundedWatchedDurationMs = Math.min(
    Math.max(watchedDurationMs, 0),
    totalDurationMs,
  );
  const completionRate = Number(
    (boundedWatchedDurationMs / totalDurationMs).toFixed(4),
  );

  return {
    watchedDurationMs: boundedWatchedDurationMs,
    completionRate,
    skipRate: Number((1 - completionRate).toFixed(4)),
  };
};

const findPlayerKey = (): string => {
  const playerInstances = window?.embeddedMedia?.api?.players();
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
  if (e?.ended === false) return;

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
  // reuses the existing reverb viewability transport for the custom playback summary
  const playbackSummaryTracker = useSwipeTracker({
    ...eventTrackingData,
    componentName: PLAYBACK_SUMMARY_COMPONENT_NAME,
    eventGroupingName: PLAYBACK_SUMMARY_EVENT_GROUPING_NAME,
    alwaysInView: true,
  });

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const endOfContentButtonRef = useRef<HTMLButtonElement>(null);
  // stores the smp playhead for the video currently active in the modal
  const activeVideoSessionRef = useRef<ActiveVideoSession | null>(null);
  // prevents duplicate close tracking when more than one close path fires
  const modalHasClosedRef = useRef(false);

  // resets tracking for whichever video smp has loaded now
  const startVideoSession = useCallback(
    (videoIndex: number) => {
      if (!isValidVideoIndex(videoIndex, blocks)) {
        activeVideoSessionRef.current = null;
        return;
      }

      activeVideoSessionRef.current = {
        index: videoIndex,
        hasStartedPlaying: false,
        maxPlayedPositionMs: 0,
        totalDurationMs: getTotalDurationMs({ videoIndex, blocks }),
      };
    },
    [blocks],
  );

  // smp docs say timeupdate gives us currentTime and duration
  // highest playhead avoids counting paused modal dwell time as watched time
  const updateActiveVideoPlaybackPosition = useCallback(
    (e?: SMPEvent) => {
      const activeVideoSession = activeVideoSessionRef.current;

      if (
        !activeVideoSession ||
        !isValidVideoIndex(activeVideoSession.index, blocks)
      ) {
        return;
      }

      const currentPlayedPositionMs = getMillisecondsFromSmpTime(
        e?.currentTime,
      );
      const currentTotalDurationMs = getMillisecondsFromSmpTime(e?.duration);

      if (currentTotalDurationMs != null && currentTotalDurationMs > 0) {
        activeVideoSession.totalDurationMs = currentTotalDurationMs;
      }

      if (currentPlayedPositionMs != null) {
        activeVideoSession.maxPlayedPositionMs = Math.max(
          activeVideoSession.maxPlayedPositionMs,
          currentPlayedPositionMs,
        );

        if (currentPlayedPositionMs > 0) {
          activeVideoSession.hasStartedPlaying = true;
        }
      }
    },
    [blocks],
  );

  // playing confirms the video really started before we send any summary event
  const handlePlaying = useCallback(
    (e: SMPEvent) => {
      updateActiveVideoPlaybackPosition(e);

      if (activeVideoSessionRef.current) {
        activeVideoSessionRef.current.hasStartedPlaying = true;
      }
    },
    [updateActiveVideoPlaybackPosition],
  );

  // keeps the session playhead in sync while smp reports playback progress
  const handlePlaybackProgress = useCallback(
    (e: SMPEvent) => {
      updateActiveVideoPlaybackPosition(e);
    },
    [updateActiveVideoPlaybackPosition],
  );

  // emits one playback summary for the active video session
  // failed loads are ignored so they do not pollute playback metric reporting
  const trackPlaybackSummaryForActiveVideo = useCallback(
    async (playbackTrigger: PlaybackSummaryTrigger) => {
      const activeVideoSession = activeVideoSessionRef.current;

      if (
        !activeVideoSession ||
        !isValidVideoIndex(activeVideoSession.index, blocks)
      ) {
        return;
      }

      const activeVideo = blocks[activeVideoSession.index];
      const totalDurationMs =
        activeVideoSession.totalDurationMs ||
        getTotalDurationMs({
          videoIndex: activeVideoSession.index,
          blocks,
        });

      if (!Number.isFinite(totalDurationMs) || totalDurationMs <= 0) return;

      if (
        !activeVideoSession.hasStartedPlaying &&
        activeVideoSession.maxPlayedPositionMs <= 0
      ) {
        return;
      }

      const { watchedDurationMs, completionRate, skipRate } =
        calculatePlaybackSummary({
          watchedDurationMs: activeVideoSession.maxPlayedPositionMs,
          totalDurationMs,
        });

      await playbackSummaryTracker({
        ...eventTrackingData,
        componentName: PLAYBACK_SUMMARY_COMPONENT_NAME,
        eventGroupingName: PLAYBACK_SUMMARY_EVENT_GROUPING_NAME,
        alwaysInView: true,
        groupTracker: {
          ...eventTrackingData.groupTracker,
          type: 'portrait-video-modal',
        },
        itemTracker: {
          type: 'portrait-video',
          text: activeVideo?.model?.video?.title,
          mediaType: 'video',
          position: activeVideoSession.index + 1,
          watchedDuration: watchedDurationMs,
          totalDuration: totalDurationMs,
          completionRate,
          skipRate,
          playbackTrigger,
          versionId: activeVideo?.model?.video?.version?.id,
          resourceId: activeVideo?.model?.video?.id,
        },
      });
    },
    [blocks, eventTrackingData, playbackSummaryTracker],
  );

  // clears immediately so late smp events cannot spill into the next video session
  const trackAndClearActiveVideoSession = useCallback(
    (playbackTrigger: PlaybackSummaryTrigger) => {
      const trackingPromise = trackPlaybackSummaryForActiveVideo(
        playbackTrigger,
      ).catch(() => undefined);

      activeVideoSessionRef.current = null;

      return trackingPromise;
    },
    [trackPlaybackSummaryForActiveVideo],
  );

  // centralises close tracking so every close path behaves consistently
  const handleModalClose = useCallback(
    (
      playbackTrigger: Extract<
        PlaybackSummaryTrigger,
        'close' | 'fullscreen-exit'
      >,
    ) => {
      if (!modalHasClosedRef.current) {
        modalHasClosedRef.current = true;
        trackAndClearActiveVideoSession(playbackTrigger);
      }

      onClose();
    },
    [onClose, trackAndClearActiveVideoSession],
  );

  // playlist changes are the reliable point where the previous video session ends
  const handlePlaylistLoaded = useCallback(
    (e: SMPEvent) => {
      const currentIndex = getCurrentIndex({ e, blocks });
      const activeVideoIndex = activeVideoSessionRef.current?.index;

      if (isValidVideoIndex(currentIndex, blocks)) {
        if (activeVideoIndex == null) {
          startVideoSession(currentIndex);
        } else if (activeVideoIndex !== currentIndex) {
          trackAndClearActiveVideoSession('navigation');
          startVideoSession(currentIndex);
        }
      }

      playlistLoadedCallback(e, blocks);
    },
    [blocks, startVideoSession, trackAndClearActiveVideoSession],
  );

  // existing navigation analytics stays separate from playback summary analytics
  const handleStatsNavigation = useCallback(
    async (e: SMPEvent) => {
      await statsNavigationCallback(e, blocks, eventTrackingData, swipeTracker);
    },
    [blocks, eventTrackingData, swipeTracker],
  );

  // smp ended means the watched duration equals the full video duration
  const handlePlaybackEnded = useCallback(
    async (e: SMPEvent) => {
      if (e?.ended === false) {
        return;
      }

      updateActiveVideoPlaybackPosition(e);

      const activeVideoSession = activeVideoSessionRef.current;

      if (activeVideoSession) {
        const completedDurationMs =
          activeVideoSession.totalDurationMs ||
          getTotalDurationMs({
            videoIndex: activeVideoSession.index,
            blocks,
          });

        if (completedDurationMs > 0) {
          activeVideoSession.totalDurationMs = completedDurationMs;
          activeVideoSession.maxPlayedPositionMs = Math.max(
            activeVideoSession.maxPlayedPositionMs,
            completedDurationMs,
          );
          activeVideoSession.hasStartedPlaying = true;
        }
      }

      await trackAndClearActiveVideoSession('ended');

      await playbackEndedCallback(e, blocks, eventTrackingData, swipeTracker);
    },
    [
      blocks,
      eventTrackingData,
      swipeTracker,
      trackAndClearActiveVideoSession,
      updateActiveVideoPlaybackPosition,
    ],
  );

  // starts the initial session when the modal opens
  useEffect(() => {
    startVideoSession(selectedVideoIndex);
  }, [selectedVideoIndex, startVideoSession]);

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

      // teardown is not a user signal, so clear without sending analytics
      activeVideoSessionRef.current = null;

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
          blocks={[blocks?.[selectedVideoIndex]]}
          eventMapping={{
            playlistLoaded: handlePlaylistLoaded,
            pluginLoaded: pluginLoadedCallback,
            fullscreenExit: () => handleModalClose('fullscreen-exit'),
            statsNavigation: handleStatsNavigation,
            ended: handlePlaybackEnded,
            playing: handlePlaying,
            timeupdate: handlePlaybackProgress,
            significanttimeupdate: handlePlaybackProgress,
          }}
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
