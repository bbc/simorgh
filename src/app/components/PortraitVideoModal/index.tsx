import { Global } from '@emotion/react';
import { use, useEffect, useRef } from 'react';
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

const getPlayerInstance = () =>
  window?.embeddedMedia?.api?.players()?.bbcMediaPlayer0; // TO do

// const getCurrentId = (e: SMPEvent): string | undefined => {
//   const playlist = (e?.playlist || {}) as Playlist;
//   const [currentItem] = (playlist?.items || []) as PlaylistItem[];
//   const currentId = currentItem?.vpid || currentItem?.versionID;

//   console.log("I'm the currentId", currentId);

//   return currentId;
// };

// const findPlayerInstanceByCurrentId = (e: SMPEvent) => {
//   const playerInstances = window?.embeddedMedia?.api?.players(); // Assuming this returns an object with player instances keyed by their IDs
//   if (!playerInstances) return undefined;

//   const currentId = getCurrentId(e); // Get the current video ID from the event or player state

//   return Object.values(playerInstances).find(player => {
//     const playlistItems = player.playlist()?.items || [];
//     return playlistItems.some(
//       item => item.vpid === currentId || item.versionID === currentId,
//     );
//   });
// };

// add a new function that takes the currentID
// it checks how many playerInstances there are in const playerInstances = window?.embeddedMedia?.api?.players();
// it returns the index of the array which matches the currentID, either 0 or 1
// if the index is 0 it returns bbcMediaPlayer0, if the index is 1 it returns bbcMediaPlayer1
const findPlayerInstanceUsingCurrentId = (currentId: string) => {
  const playerInstances = window?.embeddedMedia?.api?.players(); // Assuming this returns an object with player instances keyed by their IDs
  console.log('1 playerInstances', playerInstances);
  if (!playerInstances) return undefined;

  // I need to find the key of the playerInstance where the playlistItems matches the currentId

  const playerKeys = Object.keys(playerInstances);
  console.log('2 playerKeys', playerKeys); // returns "0: bbcMediaPlayer0"
  const index = playerKeys.findIndex(key => {
    const playlistItems = playerInstances[key].playlist()?.items || [];
    console.log('3 playlistItems', playlistItems); // returns "0: bbcMediaPlayer0"
    return playlistItems.some(
      item => item.vpid === currentId || item.versionID === currentId,
    );
  });
  console.log('4 index', index); // returns 0 or 1 depending on which player has the currentId in its playlistItems

  // return Object.values(playerInstances).find(player => {
  //   const playlistItems = player.playlist()?.items || [];
  //   return playlistItems.some(
  //     item => item.vpid === currentId || item.versionID === currentId,
  //   );
  // });

  if (index === 0) return 'bbcMediaPlayer0';
  if (index === 1) return 'bbcMediaPlayer1';
  return undefined;
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

  // const player1 = findPlayerInstanceByCurrentId(e);

  // console.log(
  //   "I'm the player returned by findPlayerInstanceByCurrentId",
  //   player1,
  // );

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

    const newEventTrackingData = getEventTrackingData({
      eventTrackingData,
      selectedVideo: blocks?.[newIndex],
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
  // console.log('playbackEndedCallback triggered with event:', e);
  const player = getPlayerInstance();

  const { ended } = e;
  const { autoplay } = player.settings();

  if (ended && autoplay) {
    const currentIndex = getCurrentIndex({ blocks, player });

    const newIndex = currentIndex + 1;

    const newEventTrackingData = getEventTrackingData({
      eventTrackingData,
      selectedVideo: blocks?.[newIndex],
      selectedVideoIndex: newIndex,
    });

    await swipeTracker(newEventTrackingData);
  }
};

// const pluginLoadedCallback = (e: SMPEvent) => {
//   const player = getPlayerInstance();
//   const player1 = findPlayerInstanceByCurrentId(e);
//   console.log('player1 from handlePrevNextVideo', player1);
//   player.dispatchEvent('fullScreenPlugin.launchFullscreen');
// };

// const handlePrevNextVideo = (direction: 'previous' | 'next', e: SMPEvent) => {
//   const player = getPlayerInstance();
//   const player1 = findPlayerInstanceByCurrentId(e);
//   console.log('player1 from handlePrevNextVideo', player1);

//   player?.[direction]?.();
// };

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
  selectedVideoId: string; // to check if always true
  nonce?: string | null;
  eventTrackingData: EventTrackingData;
}

const PortraitVideoModal = ({
  blocks,
  onClose,
  selectedVideoIndex,
  selectedVideoId,
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

  // TO do - see what happens if a player already exists
  // call function that uses selectedVideoId to check
  const myValue = findPlayerInstanceUsingCurrentId(selectedVideoId);
  console.log(
    "I'm the value returned by findPlayerInstanceUsingCurrentId",
    myValue,
  );

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

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const endOfContentButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleBackdropClick = (event: MouseEvent | TouchEvent) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
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

    const modal = document.getElementById('portrait-video-modal-container'); // check
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

      const player = getPlayerInstance();
      // Pause any player if the modal is closed instantly
      if (player) player.pause();
    };
  }, [onClose]);

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
          onClick={onClose}
        >
          {navigationIcons.cross}
          <VisuallyHiddenText>{closeVideo}</VisuallyHiddenText>
        </button>
        {/* Navigation Buttons */}
        <div css={styles.navButtonColumn}>
          <button
            id="previous-video-button"
            type="button"
            // onClick={e => handlePrevNextVideo('previous', e)}
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
            // onClick={e => handlePrevNextVideo('next', e)}
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
            playlistLoaded: e => playlistLoadedCallback(e, blocks),
            pluginLoaded: pluginLoadedCallback,
            fullscreenExit: onClose,
            statsNavigation: e =>
              statsNavigationCallback(
                e,
                blocks,
                eventTrackingData,
                swipeTracker,
              ),
            pause: e =>
              playbackEndedCallback(e, blocks, eventTrackingData, swipeTracker),
          }}
        />
        <button
          ref={endOfContentButtonRef}
          type="button"
          data-testid="close-modal-visually-hidden"
          css={styles.visuallyHiddenCloseButton}
          onClick={onClose}
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
