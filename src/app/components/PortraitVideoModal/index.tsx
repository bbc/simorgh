/** @jsx jsx */
import { jsx } from '@emotion/react';
import MediaLoader from '#app/components/MediaLoader';
import { ClipMediaBlock } from '#app/components/MediaLoader/types';
import styles from './index.styles';

type PortraitVideoModalProps = {
  video: {
    id: string;
    title: string;
    versionId: string;
    duration: string;
    guidance: string | null;
    isEmbeddingAllowed: boolean;
  };
  onClose: () => void;
};

const PortraitVideoModal = ({ video, onClose }: PortraitVideoModalProps) => {
  const clipBlock: ClipMediaBlock = {
    type: 'clipMedia',
    model: {
      type: 'video',
      images: [],
      video: {
        id: video.id,
        title: video.title,
        version: {
          id: video.versionId,
          duration: video.duration,
          kind: 'programme',
          guidance: video.guidance,
        },
        isEmbeddingAllowed: video.isEmbeddingAllowed,
      },
    },
  };

  return (
    <div css={styles.modalWrapper}>
      <div css={styles.modalInner}>
        <button
          css={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        <MediaLoader blocks={[clipBlock]} />
      </div>
    </div>
  );
};

export default PortraitVideoModal;
