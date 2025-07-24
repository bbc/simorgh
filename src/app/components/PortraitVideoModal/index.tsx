/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { Global, jsx } from '@emotion/react';
import React, { use, useEffect, useRef } from 'react';
import MediaLoader from '#app/components/MediaLoader';
import {
  PortraitClipMediaBlock,
  SMPEvent,
} from '#app/components/MediaLoader/types';
import { navigationIcons } from '#psammead/psammead-assets/src/svgs';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles from './index.styles';
import { setImageWidth } from '../MediaLoader/configs/portraitClipMedia';
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
    const [fallbackImage, portraitImage] = previous?.images || [];

    player.setPreviousPlaylist(
      {
        title: previous?.video?.title ?? '',
        holdingImageURL: setImageWidth(
          (portraitImage || fallbackImage)?.urlTemplate,
        ),
        items: [{ versionID: previous?.video?.version?.id }],
      },
      { statsObject: { clipPID: previous?.video?.id } },
    );
  }

  if (next) {
    const [fallbackImage, portraitImage] = next?.images || [];

    player.queuePlaylist(
      {
        title: next?.video?.title ?? '',
        holdingImageURL: setImageWidth(
          (portraitImage || fallbackImage)?.urlTemplate,
        ),
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

export const getBlocks = (
  items: PortraitVideoModalProps['items'],
): PortraitClipMediaBlock[] =>
  items.map(item => ({
    type: 'portraitClipMedia',
    model: {
      type: 'video',
      images: item.images.map(img => ({
        source: img.url,
        urlTemplate: img.urlTemplate,
      })),
      video: {
        id: item.id,
        title: item.title,
        version: {
          id: item.versionId,
          duration: item.duration,
          kind: item.kind,
          guidance: item.guidance,
          territories: item.territories,
        },
        isEmbeddingAllowed: item.isEmbeddingAllowed,
      },
    },
  }));

export interface PortraitVideoModalProps {
  items: {
    id: string;
    title: string;
    versionId: string;
    duration: string;
    kind: string;
    guidance: string | null;
    territories: string[];
    isEmbeddingAllowed: boolean;
    images: {
      url: string;
      urlTemplate?: string;
    }[];
  }[];
  onClose: () => void;
  selectedVideoIndex: number;
}

const PortraitVideoModal = ({
  items,
  onClose,
  selectedVideoIndex,
}: PortraitVideoModalProps) => {
  const {
    translations: {
      media: { closeVideo = 'Close', modalLabel = 'Media player' },
    },
  } = use(ServiceContext);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const blocks = getBlocks(items);

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
    };

    const modal = modalRef.current;
    const reactRootElement = document.getElementById('root');

    if (modal) {
      closeButtonRef.current?.focus();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          type="button"
          tabIndex={0}
          data-testid="close-modal-visually-hidden"
          css={{
            position: 'absolute',
            top: '2rem',
            left: '2rem',
            zIndex: 2,
            padding: 0,
            background: 'transparent',
            border: 0,
            width: 1,
            height: 1,
            margin: -1,
            overflow: 'hidden',
            clip: 'rect(0 0 0 0)',
            whiteSpace: 'nowrap',
            ':focus': {
              outline: '2px solid #ff0000',
              boxShadow: '0 0 0 4px #fff',
              width: 'max-content',
              height: 'auto',
              overflow: 'visible',
              clip: 'auto',
              margin: 0,
            },
          }}
          className="focusIndicatorInvert"
          onClick={onClose}
          aria-label="End of content. Close Modal"
        >
          <VisuallyHiddenText>End of content. Close Modal</VisuallyHiddenText>
        </button>
      </div>
    </>
  );
};

export default PortraitVideoModal;
