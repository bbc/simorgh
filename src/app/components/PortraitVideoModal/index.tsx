/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { Global, jsx } from '@emotion/react';
import React, { use, useEffect, useRef, useState, useCallback } from 'react';
import MediaLoader from '#app/components/MediaLoader';
import {
  PortraitClipMediaBlock,
  SMPEvent,
} from '#app/components/MediaLoader/types';
import { navigationIcons } from '#psammead/psammead-assets/src/svgs';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles from './index.styles';
import VisuallyHiddenText from '../VisuallyHiddenText';
import { DownArrowIcon, UpArrowIcon } from '../icons';

const getPlayerInstance = () =>
  window?.embeddedMedia?.api?.players()?.bbcMediaPlayer0;

// called when the player emits a playlistLoaded event.
// finds the current video index based on the event payload and updates React state via setSelectedVideoIndex.
export const playlistLoadedCallback = (
  e: SMPEvent,
  blocks: PortraitClipMediaBlock[],
  setSelectedVideoIndex: (index: number) => void,
) => {
  const player = getPlayerInstance();

  if (!player) return;

  const { playlist } = e || {};
  const [currentItem] = playlist?.items || [];
  const currentId = currentItem?.vpid || currentItem?.versionID;

  // Find the index of the current video in the blocks array
  const currentIndex = blocks?.findIndex(
    item =>
      item.model.video.id === currentId ||
      item.model.video.version.id === currentId,
  );

  // Update React state to reflect the current video
  if (currentIndex !== -1) {
    setSelectedVideoIndex(currentIndex);
  }
  // sets up the previous and next playlists for the player
  const previous = blocks?.[currentIndex - 1]?.model;
  const next = blocks?.[currentIndex + 1]?.model;

  // if there is a previous video, set it as the previous playlist
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
  // if there is a next video, set it as the next playlist
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

const pluginLoadedCallback = () => {
  const player = getPlayerInstance();
  player.dispatchEvent('fullScreenPlugin.launchFullscreen');
};

export interface PortraitVideoModalProps {
  blocks: PortraitClipMediaBlock[];
  onClose: () => void;
  selectedVideoIndex: number;
}

const PortraitVideoModal = ({
  blocks,
  onClose,
  selectedVideoIndex: initialSelectedVideoIndex,
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

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const endOfContentButtonRef = useRef<HTMLButtonElement>(null);

  const [selectedVideoIndex, setSelectedVideoIndex] = useState(
    initialSelectedVideoIndex,
  );
  // if the selectVideoIndex is greater than 0, there is a previous video
  const hasPrevious = selectedVideoIndex > 0;
  // if the selectVideoIndex is less than the length of the blocks array minus 1, there is a next video
  const hasNext = selectedVideoIndex < blocks.length - 1;
  // These handlers call the player’s navigation methods,
  // which will trigger the player to load the previous or next video.
  const handlePrevious = useCallback(() => {
    const player = getPlayerInstance();
    if (hasPrevious && player?.previous) {
      player?.pause();
      player.previous();
    }
  }, [hasPrevious]);

  const handleNext = useCallback(() => {
    const player = getPlayerInstance();
    if (hasNext && player?.next) {
      player?.pause();
      player.next();
    }
  }, [hasNext]);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('[PortraitVideoModal] useEffect running');

    const player = getPlayerInstance();
    // eslint-disable-next-line no-console
    console.log('[PortraitVideoModal] player instance:', player);

    if (!player?.bind) {
      // eslint-disable-next-line no-console
      console.log('[PortraitVideoModal] player or player.bind not available');
      return;
    }
    // This effect binds to the player’s playlistLoaded event and updates the React state when the player changes videos
    // run handlePlaylistLoaded every time it emits a playlistLoaded event.
    const handlePlaylistLoaded = (e: SMPEvent) => {
      const { playlist } = e || {};
      // gets currentItem from the playlist
      const [currentItem] = playlist?.items || [];
      const currentId = currentItem?.vpid || currentItem?.versionID;
      // finds the index of the current video in the blocks array
      const currentIndex = blocks.findIndex(
        item =>
          item.model.video.id === currentId ||
          item.model.video.version.id === currentId,
      );
      // eslint-disable-next-line no-console
      console.log(
        '[PortraitVideoModal] playlistLoaded event received, currentId:',
        currentId,
        'currentIndex:',
        currentIndex,
      );
      if (currentIndex !== -1) {
        // updates the selected video index in React state
        setSelectedVideoIndex(currentIndex);
      }
    };

    player.bind('playlistLoaded', handlePlaylistLoaded);

    // eslint-disable-next-line no-console
    console.log('[PortraitVideoModal] player.bind for playlistLoaded called');

    // If your player supports unbinding, add cleanup here.
    // Otherwise, you may need to ignore this for now.
  }, [blocks]);

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

    const modal = modalRef.current;
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
        ref={modalRef}
        css={styles.modal}
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
            type="button"
            onClick={handlePrevious}
            disabled={!hasPrevious}
            css={styles.navButton}
            aria-label="Previous video"
            data-testid="previous-video-button"
            className="focusIndicatorInvert"
          >
            <UpArrowIcon />
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={!hasNext}
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
            playlistLoaded: e =>
              playlistLoadedCallback(e, blocks, setSelectedVideoIndex),
            pluginLoaded: pluginLoadedCallback,
            fullscreenExit: onClose,
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
