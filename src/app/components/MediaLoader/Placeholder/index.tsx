/** @jsx jsx */
import { jsx } from '@emotion/react';
import Image from '../../Image';
import styles from './index.styles';
import PlayButton from './PlayButton';
import Guidance from './Guidance';
import { MediaInfo, Orientations } from '../types';

interface Props {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  src?: string;
  srcSet?: string;
  mediaInfo?: MediaInfo;
  noJsMessage?: string;
  orientation?: Orientations;
  embedded?: boolean;
}

const MediaPlayerPlaceholder = ({
  onClick,
  src = '',
  srcSet,
  mediaInfo,
  noJsMessage = '',
  orientation,
  embedded,
}: Props) => {
  const {
    title,
    datetime,
    duration,
    durationSpoken,
    type = 'video',
    guidanceMessage,
  } = mediaInfo ?? {};

  const portraitStyling =
    orientation === 'portrait' && embedded
      ? styles.placeholderPortraitEmbedded
      : styles.placeholderPortrait;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      onClick={onClick}
      css={[
        styles.placeholder,
        orientation === 'portrait' && portraitStyling,
        orientation === 'landscape' && styles.placeholderLandscape,
      ]}
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

      <Image alt="" src={src} srcSet={srcSet} />
    </div>
  );
};

export default MediaPlayerPlaceholder;
