/** @jsx jsx */
import { jsx } from '@emotion/react';
import PlayButton from '#psammead/psammead-play-button/src';
import NO_JS_CLASSNAME from '#app/lib/noJs.const';
import { useContext } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import Guidance from '#app/legacy/components/MediaPlayer/Guidance';
import { Stages } from '#app/hooks/useExperimentHook';
import SignPost from '#app/components/TranscriptExperiment/SignPost';
import MiniPlayButton from '../../TranscriptExperiment/PlayButton';
import Image from '../../Image';
import styles from './index.styles';
import { MediaInfo } from '../types';

interface Props {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  src: string;
  srcSet?: string;
  mediaInfo: MediaInfo;
  noJsMessage: string;
  experimentStage?: Stages;
}

const MediaPlayerPlaceholder = ({
  onClick,
  src,
  srcSet,
  mediaInfo,
  noJsMessage,
  experimentStage = Stages.DEFAULT,
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

  const playButton = (
    <PlayButton
      css={styles.playButton}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClick={() => {}}
      title={title}
      service={service}
      datetime={datetime}
      duration={duration}
      durationSpoken={durationSpoken}
      type={type}
      guidanceMessage={guidanceMessage}
      className="focusIndicatorRemove"
    />
  );

  const experimentPlayButton = (
    <MiniPlayButton
      title={title}
      datetime={datetime}
      duration={duration}
      durationSpoken={durationSpoken}
      type={type}
      guidanceMessage={guidanceMessage}
      className="experimentButtonFocus"
    />
  );

  const guideComponent = (
    <Guidance
      css={styles.guidance}
      service={service}
      guidanceMessage={guidanceMessage}
      noJsClassName={NO_JS_CLASSNAME}
      noJsMessage={noJsMessage}
    />
  );

  const experimentSignPost = <SignPost />;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      onClick={onClick}
      css={styles.placeholder}
      data-e2e="media-loader__placeholder"
    >
      {experimentStage === Stages.STAGE_2 ? experimentSignPost : guideComponent}
      {experimentStage === Stages.STAGE_2 ? experimentPlayButton : playButton}
      <Image alt="" src={src} srcSet={srcSet} />
    </div>
  );
};

export default MediaPlayerPlaceholder;
