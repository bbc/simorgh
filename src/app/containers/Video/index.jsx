import React from 'react';
import Helmet from 'react-helmet';
import Figure from '@bbc/psammead-figure';
import deepGet from '../../helpers/json/deepGet';
import Video from '../../components/Video';
import Caption from '../Caption';
import videoMetadata from './videoMetadata';
import { GridItemConstrainedLargeNoMargin } from '../../lib/styledGrid';
import mediatorURL from './mediatorUrls';

import {
  videoPropTypes,
  emptyBlockArrayDefaultProps,
} from '../../models/propTypes';
import { filterForBlockType } from '../../helpers/blockHandlers';
import { RequestContext } from '../../contexts/RequestContext';

const VideoContainer = ({ blocks }) => {
  const { platform, statsDestination, statsPageIdentifier } = React.useContext(
    RequestContext,
  );

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
    deepGet(['model', 'blocks', 0, 'model', 'format'], aresMediaBlock) ===
    'audio_video'
      ? 'programme'
      : 'audio';
  const pid = deepGet(['id'], nestedModel);
  const title = deepGet(['title'], nestedModel);
  const version = deepGet(['versions', 0], nestedModel);
  const duration = deepGet(['duration'], version);
  const versionID = deepGet(['versionId'], version);
  const holdingImageUrl = deepGet(
    ['blocks', 1, 'model', 'blocks', 0, 'model', 'locator'],
    aresMediaBlock.model,
  );

  const env = process.env.APP_ENV;

  const mediaPlayerSettings = {
    product: 'news',
    responsive: true,
    statsObject: { clipPID: pid },
    playlistObject: {
      title,
      holdingImageURL: `https://${holdingImageUrl}`,
      items: [
        {
          versionID,
          duration,
          kind,
        },
      ],
    },
    mediator: {
      host: mediatorURL(env),
    },
  };

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
        <Video
          id="mediaPlayer"
          pid={pid}
          title={title}
          statsAppName="news"
          statsAppType={platform === 'amp' ? 'amp' : 'responsive'}
          statsCountername={statsPageIdentifier}
          statsDestination={statsDestination}
          uiLocale="en-GB"
          mediaPlayerSettings={mediaPlayerSettings}
        />
        {captionBlock ? <Caption block={captionBlock} video /> : null}
      </Figure>
    </GridItemConstrainedLargeNoMargin>
  );
};

VideoContainer.propTypes = videoPropTypes;

VideoContainer.defaultProps = emptyBlockArrayDefaultProps;

export default VideoContainer;
