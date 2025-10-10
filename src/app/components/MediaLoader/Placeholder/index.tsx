/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import React from 'react';
import Image from '../../Image';
import { MediaInfo } from '../types';
import Guidance from './Guidance';
import styles from './index.styles';
import PlayButton from './PlayButton';
import MediaIndicatorWithSustainabilityMessage from './WithSustainabilityMessage/MediaIndicator';
import SustainabilityMessage from './WithSustainabilityMessage/Message';
import SustainabilityMessageNoJs from './WithSustainabilityMessage/MessageNoJs';

interface Props {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  src?: string;
  srcSet?: string;
  mediaInfo?: MediaInfo;
  noJsMessage?: string;
  hasTranscript?: boolean;
  isPortraitOrientation?: boolean;
}

const MediaPlayerPlaceholder = ({
  onClick,
  src = '',
  srcSet,
  mediaInfo,
  noJsMessage = '',
  hasTranscript = false,
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

  const showSustainabilityMessage = hasTranscript;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      onClick={onClick}
      css={
        showSustainabilityMessage
          ? styles.placeholderWithTranscript
          : styles.placeholder
      }
      data-e2e="media-loader__placeholder"
      {...(showSustainabilityMessage && {
        className: 'mediaLoaderPlaceholder',
      })}
    >
      {showSustainabilityMessage ? (
        <>
          <SustainabilityMessage title={title} />
          <MediaIndicatorWithSustainabilityMessage
            title={title}
            datetime={datetime}
            duration={duration}
            durationSpoken={durationSpoken}
            type={type}
            guidanceMessage={guidanceMessage}
          />
          <SustainabilityMessageNoJs noJsMessage={noJsMessage} />
        </>
      ) : (
        <>
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
        </>
      )}
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
