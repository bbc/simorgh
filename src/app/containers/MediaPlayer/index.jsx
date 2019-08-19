import React from 'react';
import pathOr from 'ramda/src/pathOr';
import AmpMediaPlayer from './amp';
import CanonicalMediaPlayer from './canonical';
import MediaPlayerWrapper from './wrapper';
import Metadata from './Metadata';
import embedUrl from './helpers/embedUrl';
import getPlaceholderSrc from './helpers/placeholder';
import filterForBlockType from '../../lib/utilities/blockHandlers';
import useToggle from '../Toggle/useToggle';
import { RequestContext } from '../../contexts/RequestContext';
import { GridItemConstrainedMedium } from '../../lib/styledGrid';
import {
  mediaPlayerPropTypes,
  emptyBlockArrayDefaultProps,
} from '../../models/propTypes';

const MediaPlayerContainer = ({ blocks, placeholder }) => {
  const { id, platform, origin } = React.useContext(RequestContext);
  const { enabled } = useToggle('mediaPlayer');
  const isAmp = platform === 'amp';

  if (!enabled || !blocks) {
    return null;
  }

  const aresMediaBlock = filterForBlockType(blocks, 'aresMedia');

  if (!aresMediaBlock) {
    return null;
  }

  const imageUrl = pathOr(
    null,
    ['model', 'blocks', 1, 'model', 'blocks', 0, 'model', 'locator'],
    aresMediaBlock,
  );
  const versionId = pathOr(
    null,
    ['model', 'blocks', 0, 'model', 'versions', 0, 'versionId'],
    aresMediaBlock,
  );

  if (!versionId) {
    return null; // this should be the holding image with an error overlay
  }

  const Player = isAmp ? AmpMediaPlayer : CanonicalMediaPlayer;
  const shouldShowPlaceholder = !isAmp && placeholder;
  const placeholderSrc = getPlaceholderSrc(imageUrl);
  const embedSource = embedUrl({
    vpid: versionId,
    assetId: id,
    isAmp,
    origin,
  });

  return (
    <GridItemConstrainedMedium>
      <Metadata aresMediaBlock={aresMediaBlock} />
      <MediaPlayerWrapper
        showPlaceholder={shouldShowPlaceholder}
        src={placeholderSrc}
      >
        <Player embedSrc={embedSource} />
      </MediaPlayerWrapper>
    </GridItemConstrainedMedium>
  );
};

MediaPlayerContainer.propTypes = mediaPlayerPropTypes;
MediaPlayerContainer.defaultProps = {
  ...emptyBlockArrayDefaultProps,
  placeholder: true,
};

export default MediaPlayerContainer;
