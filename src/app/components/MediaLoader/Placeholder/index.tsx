/** @jsx jsx */
import { jsx } from '@emotion/react';
import NO_JS_CLASSNAME from '#app/lib/noJs.const';
import { useContext } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import Guidance from '#app/legacy/components/MediaPlayer/Guidance';
import Image from '../../Image';
import styles from './index.styles';
import { MediaInfo } from '../types';
import PlayButton from './PlayButton';

interface Props {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  src: string;
  srcSet?: string;
  mediaInfo: MediaInfo;
  noJsMessage: string;
}

const MediaPlayerPlaceholder = ({
  onClick,
  src,
  srcSet,
  mediaInfo,
  noJsMessage,
}: Props) => {
  const {
    title,
    datetime,
    duration,
    durationSpoken,
    type = 'video',
    guidanceMessage,
  } = mediaInfo;

  const { service } = useContext(ServiceContext);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      onClick={onClick}
      css={styles.placeholder}
      data-e2e="media-loader__placeholder"
    >
      <Guidance
        css={styles.guidance}
        service={service}
        guidanceMessage={guidanceMessage}
        noJsClassName={NO_JS_CLASSNAME}
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
