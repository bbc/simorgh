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

const findPlayerInstances = () => {
  let playerKey;
  // ts-ignore - need to check the type of players and playlist items to make this work
  const playerInstances = window?.embeddedMedia?.api?.players();
  console.log('1 playerInstances', playerInstances);
  if (!playerInstances) {
    // if there are no other active players on the page, then this is the first player
    console.log('No active players found, defaulting to bbcMediaPlayer0');
    playerKey = `bbcMediaPlayer0`;
    return playerKey;
  }

  if (Object.keys(playerInstances).length === 1) {
    // if there is one other active player on the page, then this is not the first player and we need to do x
    console.log(
      'playerInstances).length === 1, we assume this is the only media player, so we default to bbcMediaPlayer0',
    );
    playerKey = `bbcMediaPlayer0`;
    return playerKey;
  }

  if (Object.keys(playerInstances).length > 1) {
    // this is when both players have been opened and closed and the PV is reopended.
    console.log('playerInstances).length > 1 do something, y');
    playerKey = `bbcMediaPlayer1`;
    return playerKey;
  }

  return playerKey;
};

// const getPlayerInstanceOLD = () => {
//   return window?.embeddedMedia?.api?.players()?.bbcMediaPlayer0; // TO do
// };

const getPlayerInstance = () => {
  console.log('Attempting to get player instance');
  const playerKey = findPlayerInstances();
  if (playerKey === 'bbcMediaPlayer0') {
    console.log('Returning bbcMediaPlayer0');
  } else if (playerKey === 'bbcMediaPlayer1') {
    console.log('Returning bbcMediaPlayer1');
  } else {
    console.log('No player key found, returning undefined');
    return undefined;
  }
  return window?.embeddedMedia?.api?.players()?.[playerKey];
};

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
// it returns the index of the array which matches the currentID if it exists
// const findPlayerInstanceUsingCurrentId = (currentId: string) => {
//   let playerKey;
//   console.log('0 currentId', currentId);
//   // ts-ignore - need to check the type of players and playlist items to make this work
//   const playerInstances = window?.embeddedMedia?.api?.players();
//   console.log('1 playerInstances', playerInstances);
//   if (!playerInstances) {
//     // if there are no other active players on the page, then this is the first player
//     console.log('No active players found, defaulting to bbcMediaPlayer0');
//     playerKey = `bbcMediaPlayer0`;
//     return playerKey;
//   }

//   if (Object.keys(playerInstances).length === 1) {
//     // if there is one other active player on the page, then this is not the first player and we need to do x
//     console.log(
//       'playerInstances).length === 1, we assume the other video has been played and closed, so we default to bbcMediaPlayer1',
//     );
//     playerKey = `bbcMediaPlayer1`;
//     return playerKey;
//   }

//   if (Object.keys(playerInstances).length > 1) {
//     // this is when both players have been opened and closed and the PV is reopended.
//     console.log('playerInstances).length > 1 do something, y');
//   }

//   // if (playerInstances) {
//   //   console.log('Active players found, defaulting to bbcMediaPlayer1');
//   //   playerKey = `bbcMediaPlayer1`;
//   //   return playerKey;
//   // }

//   const playerKeys = Object.keys(playerInstances);
//   console.log('2 playerKeys', playerKeys);

//   const matchingIndex = playerKeys.findIndex(key => {
//     const playlistItems = playerInstances[key].playlist()?.items || [];
//     console.log('3 playlistItems', playlistItems); // returns "0: bbcMediaPlayer0"
//     return playlistItems.some(
//       item => item.vpid === currentId || item.versionID === currentId,
//     );
//   });
//   console.log('4 matchingIndex', matchingIndex);

//   // if the index does not match and there are no other active players on the page, then this is the first player
//   if (matchingIndex === -1 && playerKeys.length < 1) {
//     playerKey = `bbcMediaPlayer0`;
//   }

//   // if the index does not match but there are active players on the page, then this is not the first player and we need to take the index
//   if (matchingIndex === -1 && playerKeys.length > 0) {
//     playerKey = `bbcMediaPlayer${playerKeys.length}`;
//   }

//   // if the index matches then take that id - I need to check if this will happen
//   if (matchingIndex !== -1) {
//     playerKey = `bbcMediaPlayer${matchingIndex}`;
//   }

//   return playerKey;
// };

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
  // selectedVideoId: string; // to check if always true
  nonce?: string | null;
  eventTrackingData: EventTrackingData;
}

const PortraitVideoModal = ({
  blocks,
  onClose,
  selectedVideoIndex,
  // selectedVideoId,
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
  // const myValue = findPlayerInstanceUsingCurrentId(selectedVideoId);
  const myValue = findPlayerInstances();
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
