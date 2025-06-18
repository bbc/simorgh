/** @jsx jsx */
import { jsx } from '@emotion/react';
import { use, useEffect, useRef } from 'react';
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
      media: { closeVideo = 'Close' },
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

    if (modal) {
      modal.scrollTop = 0;
      closeButtonRef.current?.focus();
      document.body.style.overflow = 'hidden';

      modal.addEventListener('mousedown', handleBackdropClick);
      modal.addEventListener('touchstart', handleBackdropClick);
      modal.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.removeAttribute('style');

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
    <div role="dialog" aria-modal="true" ref={modalRef} css={styles.modal}>
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
    </div>
  );
};

export default PortraitVideoModal;
