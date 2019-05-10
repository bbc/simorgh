import React from 'react';
import Figure from '@bbc/psammead-figure';
import Video from '../../components/Video';
import Caption from '../Caption';

import {
  videoPropTypes,
  emptyBlockArrayDefaultProps,
} from '../../models/propTypes';
import { filterForBlockType } from '../../helpers/blockHandlers';

const VideoContainer = ({ blocks }) => {
  const captionBlock = filterForBlockType(blocks, 'caption');
  const aresMediaBlock = filterForBlockType(blocks, 'aresMedia');
  if (!aresMediaBlock) {
    return null;
  }

  return (
    <Figure>
      <Video {...aresMediaBlock} />
      {captionBlock ? <Caption block={captionBlock} video /> : null}
    </Figure>
  );
};

VideoContainer.propTypes = videoPropTypes;

VideoContainer.defaultProps = emptyBlockArrayDefaultProps;

export default VideoContainer;
