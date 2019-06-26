import React from 'react';
import Helmet from 'react-helmet';
import Figure from '@bbc/psammead-figure';
import deepGet from '../../lib/utilities/deepGet';
import Video from '../../components/Video';
import Caption from '../Caption';
import videoMetadata from './videoMetadata';
import { GridItemConstrainedLargeNoMargin } from '../../lib/styledGrid';
import mediatorURL from './helpers/mediatorUrl';

import {
  videoPropTypes,
  emptyBlockArrayDefaultProps,
} from '../../models/propTypes';
import filterForBlockType from '../../lib/utilities/blockHandlers';
import { RequestContext } from '../../contexts/RequestContext';

const VideoContainer = ({ blocks }) => {
  const {
    env,
    platform,
    statsDestination,
    statsPageIdentifier,
  } = React.useContext(RequestContext);

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
  const pid = deepGet(['id'], nestedModel);
  const title = deepGet(['title'], nestedModel);
  const version = deepGet(['versions', 0], nestedModel);
  const duration = deepGet(['duration'], version);
  const versionID = deepGet(['versionId'], version);
  const holdingImageUrl = deepGet(
    ['blocks', 1, 'model', 'blocks', 0, 'model', 'locator'],
    aresMediaBlock.model,
  );
  const guidance = deepGet(['warnings', 'short'], version);
  const id = `mp#${pid}`;
  const mediaPlayerSettings = {
    product: 'news',
    responsive: true,
    statsObject: { clipPID: pid },
    mediator: {
      host: mediatorURL(env),
    },
    playlistObject: {
      title,
      holdingImageURL: `https://${holdingImageUrl}`,
      guidance,
      items: [
        {
          versionID,
          duration,
          kind,
        },
      ],
    },
    ui: {
      subtitles: {
        defaultOn: true,
      },
      locale: {
        lang: 'en-GB',
      },
    },
  };

  const type = kind === 'audio' ? kind : 'video';

  return (
    <GridItemConstrainedLargeNoMargin>
      {metadata ? (
        <>
          <Helmet>
            {
              <script type="application/ld+json">
                {JSON.stringify(metadata)}
              </script>
            }
          </Helmet>
          <Helmet>
            <script
              async
              custom-element="amp-iframe"
              src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"
            />
          </Helmet>
        </>
      ) : null}
      <Figure>
        {platform === 'canonical' ? (
          <Video
            id={id}
            title={title}
            statsAppName="news"
            statsAppType="responsive"
            statsCountername={statsPageIdentifier}
            statsDestination={statsDestination}
            uiLocale="en-GB"
            mediaPlayerSettings={mediaPlayerSettings}
          />
        ) : (
          <amp-iframe
            src="https://www.bbc.co.uk/news/uk-politics-46827301/embed/p06w3lfm?#amp=1"
            width="350"
            height="200"
            layout="responsive"
            scrolling="no"
            sandbox="allow-scripts allow-same-origin"
          >
            <amp-img
              src="https://ichef.bbci.co.uk/news/640/cpsprodpb/E7DB/production/_101655395_paulineclayton.jpg"
              layout="fill"
              placeholder
            />
          </amp-iframe>
        )}
        {captionBlock ? <Caption block={captionBlock} type={type} /> : null}
      </Figure>
    </GridItemConstrainedLargeNoMargin>
  );
};

VideoContainer.propTypes = videoPropTypes;

VideoContainer.defaultProps = emptyBlockArrayDefaultProps;

export default VideoContainer;
