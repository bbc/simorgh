import React from 'react';
import Helmet from 'react-helmet';
import Figure from '@bbc/psammead-figure';
import deepGet from '../../lib/utilities/deepGet';
import Canonical from './Canonical';
import Caption from '../Caption';
import videoMetadata from './videoMetadata';
import { GridItemConstrainedLargeNoMargin } from '../../lib/styledGrid';

import {
  videoPropTypes,
  emptyBlockArrayDefaultProps,
} from '../../models/propTypes';
import filterForBlockType from '../../lib/utilities/blockHandlers';
import { RequestContext } from '../../contexts/RequestContext';

const AudioVideoContainer = ({ blocks }) => {
  const { platform } = React.useContext(RequestContext);

  if (!blocks) {
    return null;
  }

  const aresMediaBlock = filterForBlockType(blocks, 'aresMedia');

  if (!aresMediaBlock) {
    return null;
  }

  const metadata = videoMetadata(aresMediaBlock);
  const captionBlock = filterForBlockType(blocks, 'caption');
  const nestedModel = deepGet(['model', 'blocks', 0, 'model'], aresMediaBlock);
  const kind =
    deepGet(['format'], nestedModel) === 'audio_video' ? 'programme' : 'audio';

  const type = kind === 'audio' ? kind : 'video';

  return (
    <GridItemConstrainedLargeNoMargin>
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
        {platform === 'canonical' ? <Canonical blocks={blocks} /> : null}
        {captionBlock ? <Caption block={captionBlock} type={type} /> : null}
      </Figure>
    </GridItemConstrainedLargeNoMargin>
  );
};

AudioVideoContainer.propTypes = videoPropTypes;

AudioVideoContainer.defaultProps = emptyBlockArrayDefaultProps;

export default AudioVideoContainer;
