import type { MouseEventHandler } from 'react';
import Image from '../../Image';
import styles from './index.styles';
import PlayButton from './PlayButton';
import Guidance from './Guidance';
import type { MediaInfo } from '../types';

interface Props {
  onClick: MouseEventHandler<HTMLDivElement>;
  src?: string;
  srcSet?: string;
  mediaInfo?: MediaInfo;
  noJsMessage?: string;
  isPortraitOrientation?: boolean;
}

const MediaPlayerPlaceholder = ({
  onClick,
  src = '',
  srcSet,
  mediaInfo,
  noJsMessage = '',
  isPortraitOrientation,
}: Props) => {
  const {
    title,
    datetime,
    duration,
    durationSpoken,
    type = 'video',
    guidanceMessage,
  } = mediaInfo ?? {};

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: we want this
    // biome-ignore lint/a11y/noStaticElementInteractions: we want this
    <div
      onClick={onClick}
      css={styles.placeholder}
      data-e2e="media-loader__placeholder"
    >
      <Guidance
        css={styles.guidance}
        guidanceMessage={guidanceMessage}
        noJsMessage={noJsMessage}
      />
      <PlayButton
        css={styles.playButton}
        // biome-ignore lint/suspicious/noEmptyBlockStatements: we want this
        onClick={() => {}}
        title={title}
        datetime={datetime}
        duration={duration}
        durationSpoken={durationSpoken}
        type={type}
        guidanceMessage={guidanceMessage}
        className="focusIndicatorRemove"
      />
      <Image
        alt=""
        src={src}
        srcSet={srcSet}
        isPortraitOrientation={isPortraitOrientation}
      />
    </div>
  );
};

export default MediaPlayerPlaceholder;
