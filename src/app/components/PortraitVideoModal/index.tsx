/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useState, useEffect, useRef } from 'react';
import MediaLoader from '#app/components/MediaLoader';
import { PortraitClipMediaBlock } from '#app/components/MediaLoader/types';
import { LeftChevron, RightChevron } from '../icons';
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
  initialVideoIndex: number;
  onClose: () => void;
}

const PortraitVideoModal = ({
  items,
  initialVideoIndex,
  onClose,
}: PortraitVideoModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [currentVideoIndex, setCurrentIndex] = useState(initialVideoIndex);
  const video = items[currentVideoIndex];

  const block: PortraitClipMediaBlock = {
    type: 'portraitClipMedia',
    model: {
      type: 'video',
      images: video.images.map(img => ({
        source: img.url,
        urlTemplate: img.urlTemplate,
      })),
      video: {
        id: video.id,
        title: video.title,
        version: {
          id: video.versionId,
          duration: video.duration,
          kind: video.kind,
          guidance: video.guidance,
          territories: video.territories,
        },
        isEmbeddingAllowed: video.isEmbeddingAllowed,
      },
    },
  };

  const handlePrev = () => {
    if (currentVideoIndex > 0) {
      setCurrentIndex(i => i - 1);
    }
  };

  const handleNext = () => {
    if (currentVideoIndex < items.length - 1) {
      setCurrentIndex(i => i + 1);
    }
  };

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
        ×
      </button>

      <div css={styles.navWrapper}>
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentVideoIndex === 0}
          aria-label="Previous video"
          css={styles.navButton}
        >
          <LeftChevron />
        </button>

        <MediaLoader blocks={[block]} />

        <button
          type="button"
          onClick={handleNext}
          disabled={currentVideoIndex === items.length - 1}
          aria-label="Next video"
          css={styles.navButton}
        >
          <RightChevron />
        </button>
      </div>
    </dialog>
  );
};

export default PortraitVideoModal;
