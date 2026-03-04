import { Global } from '@emotion/react';
import { use, useCallback, useEffect, useRef } from 'react';
import moment from 'moment-timezone';
import MediaLoader from '#app/components/MediaLoader';
import { GROUP_3_MIN_WIDTH_BP } from '#app/components/ThemeProvider/mediaQueries';
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

//  disabled so skip-rate tracking runs on both mobile and desktop.
const MOBILE_ONLY_SKIP_RATE_TRACKING = false;
const MOBILE_BREAKPOINT_QUERY = `(max-width: ${GROUP_3_MIN_WIDTH_BP}rem)`;
// this name lets reverb/piano group all skip-rate events together.
const SKIP_RATE_COMPONENT_NAME = 'portrait-video-skip-rate';
const SKIP_RATE_EVENT_GROUPING_NAME = 'portrait-video-skip-rate';

// this stays a type because string literal unions are clearer than interfaces here.
type SessionTrackingExitReason =
  | 'navigation'
  | 'autoplay-end'
  | 'playlist-sync'
  | 'close-button'
  | 'backdrop'
  | 'escape'
  | 'fullscreen-exit'
  | 'unmount';

type ActiveVideoSession = {
  index: number;
  startedAt: number;
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

// this gates skip-rate tracking so we can ship mobile first and expand later
const shouldTrackSkipRate = () => {
  if (!MOBILE_ONLY_SKIP_RATE_TRACKING) {
    return true;
  }

  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia(MOBILE_BREAKPOINT_QUERY).matches
  );
};

const isValidVideoIndex = (
  videoIndex: number,
  blocks: PortraitClipMediaBlock[],
) => videoIndex >= 0 && videoIndex < blocks.length;

// this converts watched time into completion and skip fractions in the 0..1 range
const calculateSkipRateMetrics = ({
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

const getPlayerInstance = () =>
  window?.embeddedMedia?.api?.players()?.bbcMediaPlayer0;

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
  const player = getPlayerInstance();
  const { ended } = e;
  const { autoplay } = player.settings();

  if (ended && autoplay) {
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

const handlePrevNextVideo = (direction: 'previous' | 'next') => {
  const player = getPlayerInstance();

  player?.[direction]?.();
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
  // this sends the custom skip-rate event while reusing existing view tracking transport.
  const skipRateTracker = useSwipeTracker({
    ...eventTrackingData,
    componentName: SKIP_RATE_COMPONENT_NAME,
    eventGroupingName: SKIP_RATE_EVENT_GROUPING_NAME,
    alwaysInView: true,
  });

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const endOfContentButtonRef = useRef<HTMLButtonElement>(null);
  // this stores timing state for the currently active video in the modal.
  const activeVideoSessionRef = useRef<ActiveVideoSession | null>(null);
  // this avoids duplicate close tracking when multiple close paths fire.
  const modalHasClosedRef = useRef(false);

  // this starts timing for a specific video index.
  const startVideoSession = useCallback(
    (videoIndex: number) => {
      if (!shouldTrackSkipRate()) return;

      if (!isValidVideoIndex(videoIndex, blocks)) {
        activeVideoSessionRef.current = null;
        return;
      }

      activeVideoSessionRef.current = {
        index: videoIndex,
        startedAt: Date.now(),
      };
    },
    [blocks],
  );

  // this emits one skip-rate event for the active video session.
  // watched time here is modal dwell time, not smp playhead time.
  const trackSkipRateForActiveVideo = useCallback(
    async ({
      sessionExitReason,
      navigationMethod,
    }: {
      sessionExitReason: SessionTrackingExitReason;
      navigationMethod?: string;
    }) => {
      if (!shouldTrackSkipRate()) return;

      const activeVideoSession = activeVideoSessionRef.current;

      if (
        !activeVideoSession ||
        !isValidVideoIndex(activeVideoSession.index, blocks)
      ) {
        return;
      }

      const activeVideo = blocks[activeVideoSession.index];
      const totalDurationMs = moment
        .duration(activeVideo?.model?.video?.version?.duration)
        .asMilliseconds();

      if (!Number.isFinite(totalDurationMs) || totalDurationMs <= 0) return;

      const { watchedDurationMs, completionRate, skipRate } =
        calculateSkipRateMetrics({
          watchedDurationMs: Date.now() - activeVideoSession.startedAt,
          totalDurationMs,
        });

      await skipRateTracker({
        ...eventTrackingData,
        componentName: SKIP_RATE_COMPONENT_NAME,
        eventGroupingName: SKIP_RATE_EVENT_GROUPING_NAME,
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
          duration: watchedDurationMs,
          totalDuration: totalDurationMs,
          completionRate,
          skipRate,
          navigationMethod,
          sessionExitReason,
          versionId: activeVideo?.model?.video?.version?.id,
          resourceId: activeVideo?.model?.video?.id,
        },
      });
    },
    [blocks, eventTrackingData, skipRateTracker],
  );

  // this finalises the current video's metrics and then starts timing the next one.
  const trackVideoTransition = useCallback(
    async ({
      nextIndex,
      sessionExitReason,
      navigationMethod,
    }: {
      nextIndex: number;
      sessionExitReason: SessionTrackingExitReason;
      navigationMethod?: string;
    }) => {
      await trackSkipRateForActiveVideo({
        sessionExitReason,
        navigationMethod,
      });
      startVideoSession(nextIndex);
    },
    [startVideoSession, trackSkipRateForActiveVideo],
  );

  // this centralises close tracking so every close path behaves consistently.
  const handleModalClose = useCallback(
    (sessionExitReason: SessionTrackingExitReason) => {
      if (!modalHasClosedRef.current) {
        modalHasClosedRef.current = true;
        trackSkipRateForActiveVideo({ sessionExitReason }).catch(
          () => undefined,
        );
        activeVideoSessionRef.current = null;
      }

      onClose();
    },
    [onClose, trackSkipRateForActiveVideo],
  );

  // this keeps local timing in sync with whichever video smp actually loads.
  const handlePlaylistLoaded = useCallback(
    (e: SMPEvent) => {
      const currentIndex = getCurrentIndex({ e, blocks });
      const activeVideoIndex = activeVideoSessionRef.current?.index;

      if (isValidVideoIndex(currentIndex, blocks)) {
        if (activeVideoIndex == null) {
          startVideoSession(currentIndex);
        } else if (activeVideoIndex !== currentIndex) {
          trackVideoTransition({
            nextIndex: currentIndex,
            sessionExitReason: 'playlist-sync',
            navigationMethod: 'playlistLoaded',
          }).catch(() => undefined);
        }
      }

      playlistLoadedCallback(e, blocks);
    },
    [blocks, startVideoSession, trackVideoTransition],
  );

  // this tracks an intentional user navigation between videos.
  const handleStatsNavigation = useCallback(
    async (e: SMPEvent) => {
      const currentIndex = getCurrentIndex({ e, blocks });
      const nextIndex =
        e?.direction === 'next' ? currentIndex + 1 : currentIndex - 1;

      if (
        isValidVideoIndex(currentIndex, blocks) &&
        isValidVideoIndex(nextIndex, blocks)
      ) {
        await trackVideoTransition({
          nextIndex,
          sessionExitReason: 'navigation',
          navigationMethod: e?.method ?? 'unknown',
        });
      }

      await statsNavigationCallback(e, blocks, eventTrackingData, swipeTracker);
    },
    [blocks, eventTrackingData, swipeTracker, trackVideoTransition],
  );

  // this tracks autoplay moving from one video to the next after the current video ends.
  const handlePlaybackEnded = useCallback(
    async (e: SMPEvent) => {
      const player = getPlayerInstance();
      const hasEnded = Boolean(e?.ended);
      const autoplayEnabled = Boolean(player?.settings?.().autoplay);

      if (hasEnded && autoplayEnabled) {
        const currentIndex = getCurrentIndex({ blocks, player });

        if (isValidVideoIndex(currentIndex, blocks)) {
          await trackVideoTransition({
            nextIndex: currentIndex + 1,
            sessionExitReason: 'autoplay-end',
            navigationMethod: 'autoplay',
          });
        }
      }

      await playbackEndedCallback(e, blocks, eventTrackingData, swipeTracker);
    },
    [blocks, eventTrackingData, swipeTracker, trackVideoTransition],
  );

  // this starts the initial session when the modal mounts with a selected video.
  useEffect(() => {
    startVideoSession(selectedVideoIndex);
  }, [selectedVideoIndex, startVideoSession]);

  useEffect(() => {
    const handleBackdropClick = (event: MouseEvent | TouchEvent) => {
      if (event.target === event.currentTarget) {
        handleModalClose('backdrop');
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleModalClose('escape');
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
      // Prevent tabbing to elements outside the modal
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

      // this is a fallback so we still emit if react unmounts before an explicit close path runs.
      if (!modalHasClosedRef.current) {
        trackSkipRateForActiveVideo({
          sessionExitReason: 'unmount',
        }).catch(() => undefined);
        activeVideoSessionRef.current = null;
      }

      const player = getPlayerInstance();
      // Pause any player if the modal is closed instantly
      if (player) player.pause();
    };
  }, [handleModalClose, trackSkipRateForActiveVideo]);

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
          onClick={() => handleModalClose('close-button')}
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
            pause: handlePlaybackEnded,
          }}
        />
        <button
          ref={endOfContentButtonRef}
          type="button"
          data-testid="close-modal-visually-hidden"
          css={styles.visuallyHiddenCloseButton}
          onClick={() => handleModalClose('close-button')}
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
