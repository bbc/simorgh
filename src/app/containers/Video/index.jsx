import React from 'react';
import Helmet from 'react-helmet';
import Figure from '@bbc/psammead-figure';
import deepGet from '../../lib/json/deepGet';
import Video from '../../components/Video';
import Caption from '../Caption';
import videoMetadata from './videoMetadata';

import {
  videoPropTypes,
  emptyBlockArrayDefaultProps,
} from '../../models/propTypes';
import { filterForBlockType } from '../../lib/blockHandlers';
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
              custom-element="amp-video-iframe"
              src="https://cdn.ampproject.org/v0/amp-video-iframe-0.1.js"
            />
          </Helmet>
        </>
      ) : null}
      <Figure>
        {platform === 'canonical' ? (
          <Video
            pid={pid}
            kind={kind}
            title={title}
            items={items}
            holdingImageUrl={holdingImageUrl}
            statsAppName="news"
            statsAppType="responsive"
            statsCountername={statsPageIdentifier}
            statsDestination={statsDestination}
            uiLocale="en-GB"
          />
        ) : (
          <amp-video-iframe
            src="https://www.bbc.co.uk/news/uk-politics-46827301/embed/p06w3lfm?amp=1"
            poster={`https://${holdingImageUrl}`}
            width="450px"
            height="450px"
          />
        )}
        {captionBlock ? <Caption block={captionBlock} video /> : null}
      </Figure>
    </>
  );
};

VideoContainer.propTypes = videoPropTypes;

VideoContainer.defaultProps = emptyBlockArrayDefaultProps;

export default VideoContainer;
