import type { MouseEventHandler } from 'react';
import Image from '../../Image';
import styles from './index.styles';
import PlayButton from './PlayButton';
import Guidance from './Guidance';
import { MediaInfo } from '../types';

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
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
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
        // eslint-disable-next-line @typescript-eslint/no-empty-function
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
