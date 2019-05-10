import React from 'react';
import Figure from '@bbc/psammead-figure';
import deepGet from '../../helpers/json/deepGet';
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

  const nestedModel = deepGet(['model', 'blocks', 0, 'model'], aresMediaBlock);
  const kind = deepGet(['subType'], nestedModel);
  const pid = deepGet(['id'], nestedModel);
  const title = deepGet(['title'], nestedModel);
  const version = deepGet(['versions', 0], nestedModel);
  const duration = deepGet(['duration'], version);
  const versionID = deepGet(['versionId'], version);
  const holdingImageUrl = deepGet(
    ['blocks', 1, 'model', 'blocks', 0, 'model', 'locator'],
    aresMediaBlock.model,
  );
  const items = {
    versionID,
    kind,
    duration,
  };

  return (
    <Figure>
      <Video
        pid={pid}
        kind={kind}
        title={title}
        items={items}
        holdingImageUrl={holdingImageUrl}
      />
      {captionBlock ? <Caption block={captionBlock} video /> : null}
    </Figure>
  );
};

VideoContainer.propTypes = videoPropTypes;

VideoContainer.defaultProps = emptyBlockArrayDefaultProps;

export default VideoContainer;
