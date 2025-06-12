/** @jsx jsx */
import { jsx } from '@emotion/react';
import { use, useEffect, useRef } from 'react';
import MediaLoader from '#app/components/MediaLoader';
import { PortraitClipMediaBlock } from '#app/components/MediaLoader/types';
import { navigationIcons } from '#psammead/psammead-assets/src/svgs';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles from './index.styles';
import { setImageWidth } from '../MediaLoader/configs/portraitClipMedia';
import VisuallyHiddenText from '../VisuallyHiddenText';

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
  const modalRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const blocks: PortraitClipMediaBlock[] = items.map(item => ({
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

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.showModal();
      modalRef.current.scrollTop = 0;
      closeButtonRef.current?.focus();

      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.removeAttribute('style');
    };
  }, []);

  const playlistLoadedCallback = (e?: Event) => {
    const player = window?.embeddedMedia?.api?.players()?.bbcMediaPlayer0;

    if (!player) return;

    // @ts-expect-error - playlist is a custom SMP field
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

      player.setPreviousPlaylist({
        title: previous?.video?.title ?? '',
        holdingImageURL: setImageWidth(
          (portraitImage || fallbackImage)?.urlTemplate,
        ),
        items: [{ versionID: previous?.video?.version?.id }],
      });
    }

    if (next) {
      const [fallbackImage, portraitImage] = next?.images || [];

      player.queuePlaylist({
        title: next?.video?.title ?? '',
        holdingImageURL: setImageWidth(
          (portraitImage || fallbackImage)?.urlTemplate,
        ),
        items: [{ versionID: next?.video?.version?.id }],
      });
    }
  };

  const pluginLoadedCallback = () => {
    const player = window?.embeddedMedia?.api?.players()?.bbcMediaPlayer0;

    player.dispatchEvent('fullScreenPlugin.launchFullscreen');
  };

  return (
    <dialog ref={modalRef} css={styles.dialog}>
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
        playlistLoadedCallback={playlistLoadedCallback}
        pluginLoadedCallback={pluginLoadedCallback}
        exitFullscreenCallback={onClose}
      />
    </dialog>
  );
};

export default PortraitVideoModal;
