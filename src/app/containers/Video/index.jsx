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
        <Helmet>
          {
            <script type="application/ld+json">
              {JSON.stringify(metadata)}
            </script>
          }
          <script
            type="text/javascript"
            src="https://static.bbci.co.uk/frameworks/requirejs/0.13.0/sharedmodules/require.js"
          />
          <script type="text/javascript">
            {`bbcRequireMap = {
                    "bump-4":"https://emp.bbci.co.uk/emp/bump-4/bump-4"
                }
                require({ paths: bbcRequireMap, waitSeconds: 30 });`}
          </script>
        </Helmet>
      ) : null}
      <Figure>
        <Video
          id="mediaPlayer"
          pid={pid}
          kind={kind}
          title={title}
          items={items}
          holdingImageUrl={holdingImageUrl}
          statsAppName="news"
          statsAppType={platform === 'amp' ? 'amp' : 'responsive'}
          statsCountername={statsPageIdentifier}
          statsDestination={statsDestination}
          uiLocale="en-GB"
        />
        {captionBlock ? <Caption block={captionBlock} video /> : null}
        <script type="text/javascript">
          {`require(['bump-4'],function (bump) {
                console.log("HELLO WORLD 🌎");
                var settings = {
                    product: 'news',
                    responsive: true,
                    counterName: 'smp.demopage.player.page',
                    playlistObject: {
                              "title": ${title},
                              "holdingImageURL": ${holdingImageUrl},
                              "items": ${items}
                    },
                    statsObject: { clipPID: ${pid} }
                }
                var mediaPlayer = bump.player(document.getElementById('mediaPlayer'),settings);
                mediaPlayer.load();
            });
            `}
        </script>
      </Figure>
    </>
  );
};

VideoContainer.propTypes = videoPropTypes;

VideoContainer.defaultProps = emptyBlockArrayDefaultProps;

export default VideoContainer;
