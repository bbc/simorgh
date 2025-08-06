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

const getPlayerInstance = () =>
  window?.embeddedMedia?.api?.players()?.bbcMediaPlayer0;

export const playlistLoadedCallback = (
  e: SMPEvent,
  blocks: PortraitClipMediaBlock[],
) => {
  const player = getPlayerInstance();

  if (!player) return;

  const { playlist } = e || {};
  const [currentItem] = playlist?.items || [];
  const currentId = currentItem?.vpid || currentItem?.versionID;

  const currentIndex = blocks?.findIndex(
    item =>
      item.model.video.id === currentId ||
      item.model.video.version.id === currentId,
  );

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

const pluginLoadedCallback = () => {
  const player = getPlayerInstance();
  player.dispatchEvent('fullScreenPlugin.launchFullscreen');
};

export interface PortraitVideoModalProps {
  blocks: PortraitClipMediaBlock[];
  onClose: () => void;
  selectedVideoIndex: number;
}

const buttonColumnStyles = {
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  position: 'absolute' as const,
  right: '2rem',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 2,
};

const UpArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="24"
    height="24"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M31.1 2.5H1v2.8h30.1zM14.3 13.3 31 29.5v-6.7L16 8.1.9 22.8v6.7l16.8-16.2z" />
  </svg>
);

const DownArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="24"
    height="24"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M.9 29.5H31v-2.8H.9zm16.8-10.8L1 2.5v6.7l15 14.7L31.1 9.2V2.5L14.3 18.7z" />
  </svg>
);

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

  const hasPrevious = selectedVideoIndex > 0;
  const hasNext = selectedVideoIndex < blocks.length - 1;

  const handlePrevious = useCallback(() => {
    if (hasPrevious) setSelectedVideoIndex(i => i - 1);
  }, [hasPrevious]);

  const handleNext = useCallback(() => {
    if (hasNext) setSelectedVideoIndex(i => i + 1);
  }, [hasNext]);

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
        {/* Navigation Buttons */}
        <div css={buttonColumnStyles}>
          <button
            type="button"
            onClick={handlePrevious}
            disabled={!hasPrevious}
            css={styles.navButton(!hasPrevious)}
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
            css={styles.navButton(!hasNext)}
            aria-label="Next video"
            data-testid="next-video-button"
            className="focusIndicatorInvert"
          >
            <DownArrowIcon />
          </button>
        </div>
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
        <MediaLoader
          css={styles.mediaWrapper}
          blocks={[blocks?.[selectedVideoIndex]]}
          eventMapping={{
            playlistLoaded: e => playlistLoadedCallback(e, blocks),
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
