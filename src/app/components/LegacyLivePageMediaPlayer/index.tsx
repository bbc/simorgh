import React, { useContext } from 'react';
import MediaPlayerContainer from '../../legacy/containers/MediaPlayer';
import { RequestContext } from '../../contexts/RequestContext';
import { MediaBlock } from '../MediaLoader/types';
import { GridItemMediumNoMargin } from '../../legacy/components/Grid';

const LegacyLivePageMediaPlayer = ({ blocks, className }: Props) => {
  const { id } = useContext(RequestContext);

  if (!id) return null;

  return (
    <GridItemMediumNoMargin
      className={className}
      gridColumnStart={2}
      gridSpan={5}
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
  className?: string;
};

export default LegacyLivePageMediaPlayer;
