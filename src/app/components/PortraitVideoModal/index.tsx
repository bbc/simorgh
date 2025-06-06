/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useEffect, useRef } from 'react';
import MediaLoader from '#app/components/MediaLoader';
import { PortraitClipMediaBlock } from '#app/components/MediaLoader/types';
import { navigationIcons } from '#psammead/psammead-assets/src/svgs';
import styles from './index.styles';

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
  initialVideoIndex: number;
}

const PortraitVideoModal = ({
  items,
  onClose,
  initialVideoIndex,
}: PortraitVideoModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const reordered = [
    ...items.slice(initialVideoIndex),
    ...items.slice(0, initialVideoIndex),
  ];

  const blocks: PortraitClipMediaBlock[] = reordered.map(item => ({
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
        <MediaLoader blocks={blocks} />
      </div>
    </dialog>
  );
};

export default PortraitVideoModal;
