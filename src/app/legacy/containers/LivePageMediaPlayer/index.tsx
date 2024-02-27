/** @jsx jsx */
import { jsx } from '@emotion/react';
import MediaPlayer from '../../../components/MediaPlayer';
import { MediaBlock } from '../../../components/MediaPlayer/types';
import style from './index.style';

const LivePageMediaPlayer = ({ blocks, className }: Props) => {
  return (
    <div css={style.EMPContainer} className={className}>
      <MediaPlayer blocks={blocks} />
    </div>
  );
};

type Props = {
  blocks: MediaBlock[];
  className: string;
};

export default LivePageMediaPlayer;
