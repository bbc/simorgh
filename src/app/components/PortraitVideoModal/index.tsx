/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useEffect, useRef } from 'react';
import MediaLoader from '#app/components/MediaLoader';
import { PortraitClipMediaBlock } from '#app/components/MediaLoader/types';
import { navigationIcons } from '#psammead/psammead-assets/src/svgs';
import styles from './index.styles';
import { setImageWidth } from '../MediaLoader/configs/portraitClipMedia';

interface PortraitVideoModalProps {
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
  const modalRef = useRef<HTMLDialogElement>(null);

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
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.removeAttribute('style');
    };
  }, []);

  const playlistLoadedCallback = (e?: Event) => {
    const player = window.embeddedMedia.api.players().bbcMediaPlayer0;

    // @ts-expect-error - playlist is a custom SMP field
    const { playlist } = e || {};

    const currentId =
      playlist?.items?.[0]?.vpid || playlist?.items?.[0]?.versionID;

    const currentIndex = blocks?.findIndex(
      item =>
        item.model.video.id === currentId ||
        item.model.video.version.id === currentId,
    );

    const previous = blocks?.[currentIndex - 1]?.model;
    const next = blocks?.[currentIndex + 1]?.model;

    if (next) {
      player.queuePlaylist({
        title: next?.video?.title ?? '',
        holdingImageURL: setImageWidth(
          (next?.images?.[1] || next?.images?.[0])?.urlTemplate,
        ),
        items: [{ versionID: next?.video?.version?.id }],
      });
    }

    if (previous) {
      player.setPreviousPlaylist({
        title: previous?.video?.title ?? '',
        holdingImageURL: setImageWidth(
          (previous?.images?.[1] || previous?.images?.[0])?.urlTemplate,
        ),
        items: [{ versionID: previous?.video?.version?.id }],
      });
    }
  };

  return (
    <dialog ref={modalRef} css={styles.dialog}>
      <button
        type="button"
        css={styles.closeButton}
        onClick={onClose}
        aria-label="Close modal"
      >
        {navigationIcons.cross}
      </button>

      <div css={styles.navWrapper}>
        <MediaLoader
          blocks={[blocks[selectedVideoIndex]]}
          playlistLoadedCallback={playlistLoadedCallback}
        />
      </div>
    </dialog>
  );
};

export default PortraitVideoModal;
