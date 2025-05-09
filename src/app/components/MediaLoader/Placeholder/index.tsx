/** @jsx jsx */
import { PlaceholderMode } from '#app/hooks/useDeterminePlaceholderMode';
import { jsx } from '@emotion/react';
import Image from '../../Image';
import { MediaInfo } from '../types';
import Guidance from './Guidance';
import styles from './index.styles';
import PlayButton from './PlayButton';
import WithSustainabilityMessageMediaIndicator from './WithSustainabilityMessage/MediaIndicator';
import SustainabilityMessage from './WithSustainabilityMessage/Message';
import SustainabilityMessageNoJs from './WithSustainabilityMessage/MessageNoJs';

interface Props {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  src?: string;
  srcSet?: string;
  mediaInfo?: MediaInfo;
  noJsMessage?: string;
  placeholderMode?: PlaceholderMode;
}

const MediaPlayerPlaceholder = ({
  onClick,
  src = '',
  srcSet,
  mediaInfo,
  noJsMessage = '',
  placeholderMode = PlaceholderMode.DEFAULT,
}: Props) => {
  const {
    title,
    datetime,
    duration,
    durationSpoken,
    type = 'video',
    guidanceMessage,
  } = mediaInfo ?? {};

  const playButton = (
    <PlayButton
      css={styles.playButton}
      title={title}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClick={() => {}}
      datetime={datetime}
      duration={duration}
      durationSpoken={durationSpoken}
      type={type}
      guidanceMessage={guidanceMessage}
      className="focusIndicatorRemove"
    />
  );

  const playButtonWithSustainabilityMessage = (
    <WithSustainabilityMessageMediaIndicator
      title={title}
      datetime={datetime}
      duration={duration}
      durationSpoken={durationSpoken}
      type={type}
      guidanceMessage={guidanceMessage}
    />
  );

  const guideComponent = (
    <Guidance
      css={styles.guidance}
      guidanceMessage={guidanceMessage}
      noJsMessage={noJsMessage}
    />
  );

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      onClick={onClick}
      css={styles.placeholder}
      data-e2e="media-loader__placeholder"
      className="mediaLoaderPlaceholder"
    >
      {placeholderMode === PlaceholderMode.DEFAULT ? guideComponent : null}
      {placeholderMode === PlaceholderMode.SHOW_SUSTAINABILITY_MSG
        ? playButtonWithSustainabilityMessage
        : playButton}
      {placeholderMode === PlaceholderMode.SHOW_SUSTAINABILITY_MSG ? (
        <SustainabilityMessage title={title} />
      ) : null}
      <SustainabilityMessageNoJs noJsMessage={noJsMessage} />
      <Image alt="" src={src} srcSet={srcSet} />
    </div>
  );
};

export default MediaPlayerPlaceholder;
