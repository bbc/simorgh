import React, { useContext } from 'react';
import MediaPlayerContainer from '../MediaPlayer';
import { RequestContext } from '../../../contexts/RequestContext';
import { MediaBlock } from '../../../components/MediaPlayer/types';
import { GridItemMediumNoMargin } from '../../components/Grid';

const LegacyLivePageMediaPlayer = ({ blocks, className }: Props) => {
  const { id } = useContext(RequestContext);

  return (
    <GridItemMediumNoMargin
      className={className}
      gridColumnStart={null}
      gridSpan={null}
    >
      <MediaPlayerContainer
        blocks={blocks}
        assetId={id}
        assetType="live"
        showPlaceholder
      />
    </GridItemMediumNoMargin>
  );
};

type Props = {
  blocks: MediaBlock[];
  className: string;
};

export default LegacyLivePageMediaPlayer;
