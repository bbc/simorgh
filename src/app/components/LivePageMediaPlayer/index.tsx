/** @jsx jsx */
import { jsx } from '@emotion/react';
import MediaLoader from '../MediaLoader';
import { MediaBlock } from '../MediaLoader/types';
import style from './index.style';

const LivePageMediaPlayer = ({ blocks, className }: Props) => {
  return (
    <div css={style.EMPContainer} className={className}>
      <MediaLoader blocks={blocks} />
    </div>
  );
};

type Props = {
  blocks: MediaBlock[];
  className: string;
};

export default LivePageMediaPlayer;
