import React from 'react';
import Helmet from 'react-helmet';
import Figure from '@bbc/psammead-figure';
import deepGet from '../../helpers/json/deepGet';
import Video from '../../components/Video';
import Caption from '../Caption';
import videoMetadata from './videoMetadata';

import {
  videoPropTypes,
  emptyBlockArrayDefaultProps,
} from '../../models/propTypes';
import { filterForBlockType } from '../../helpers/blockHandlers';

const VideoContainer = ({ blocks }) => {
  const captionBlock = filterForBlockType(blocks, 'caption');
  const aresMediaBlock = filterForBlockType(blocks, 'aresMedia');
  const metadata = videoMetadata(aresMediaBlock);
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
  const items = [
    {
      versionID,
      kind,
      duration,
    },
  ];

  return (
    <>
      {metadata ? (
        <Helmet>
          {
            <script type="application/ld+json">
              {JSON.stringify(metadata)}
            </script>
          }
        </Helmet>
      ) : null}
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
    </>
  );
};

VideoContainer.propTypes = videoPropTypes;

VideoContainer.defaultProps = emptyBlockArrayDefaultProps;

export default VideoContainer;
