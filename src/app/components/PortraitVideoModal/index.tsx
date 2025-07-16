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
      <Global styles={{ body: { overflow: 'hidden' } }} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={modalLabel}
        ref={modalRef}
        className="fixed inset-0 overflow-hidden w-full max-w-full h-full max-h-full bg-transparent border-none m-0 p-0 flex flex-col items-center justify-center z-[2147483647] after:content-[''] after:absolute after:inset-0 after:bg-black/90 after:backdrop-blur-sm after:z-0"
      >
        <button
          ref={closeButtonRef}
          type="button"
          data-testid="close-modal-button"
          className="hidden absolute top-8 right-8 bg-transparent border-2 border-white cursor-pointer p-0 z-10 hover:bg-postbox focus-visible:bg-postbox group-3:flex focusIndicatorInvert forced-colors:border-canvas-text"
          onClick={onClose}
        >
          {navigationIcons.cross}
          <VisuallyHiddenText>{closeVideo}</VisuallyHiddenText>
        </button>
        <MediaLoader
          className="media-container w-auto h-full max-w-full max-h-full m-0 mx-0 z-10 group-3:max-h-[90%]"
          blocks={[blocks?.[selectedVideoIndex]]}
          eventMapping={{
            playlistLoaded: e => playlistLoadedCallback(e, blocks),
            pluginLoaded: pluginLoadedCallback,
            fullscreenExit: onClose,
          }}
        />
      </div>
    </>
  );
};

export default PortraitVideoModal;
