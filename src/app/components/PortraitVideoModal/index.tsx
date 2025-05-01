/** @jsx jsx */
import { jsx } from '@emotion/react';
import MediaLoader from '#app/components/MediaLoader';
import { PortraitClipMediaBlock } from '#app/components/MediaLoader/types';
import styles from './index.styles';

type PortraitVideoModalProps = {
  video: {
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
      urlTemplate: string;
    }[];
  };
  onClose: () => void;
};

const PortraitVideoModal = ({ video, onClose }: PortraitVideoModalProps) => {
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
        <MediaLoader blocks={[block]} />
      </div>
    </div>
  );
};

export default PortraitVideoModal;
