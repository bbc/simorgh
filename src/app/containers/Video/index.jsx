import React, { useContext } from 'react';
import Figure from '@bbc/psammead-figure';
import { ServiceContext } from '../../contexts/ServiceContext';
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
  const { script } = useContext(ServiceContext);
  if (!aresMediaBlock) {
    return null;
  }

  return (
    <Figure>
      <Video />
      {captionBlock ? (
        <Caption block={captionBlock} script={script} video />
      ) : null}
    </Figure>
  );
};

VideoContainer.propTypes = videoPropTypes;

VideoContainer.defaultProps = emptyBlockArrayDefaultProps;

export default VideoContainer;
