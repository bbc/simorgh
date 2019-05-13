import React from 'react';
import Helmet from 'react-helmet';
import Figure from '@bbc/psammead-figure';
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
        <Video />
        {captionBlock ? <Caption block={captionBlock} video /> : null}
      </Figure>
    </>
  );
};

VideoContainer.propTypes = videoPropTypes;

VideoContainer.defaultProps = emptyBlockArrayDefaultProps;

export default VideoContainer;
