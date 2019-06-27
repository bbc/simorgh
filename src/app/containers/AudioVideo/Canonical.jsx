import React from 'react';
// import { string } from 'prop-types';
import deepGet from '../../lib/utilities/deepGet';
import Video from '../../components/Video';
import mediatorURL from './helpers/mediatorUrl';

import { videoComponentPropTypes } from '../../models/propTypes';
import filterForBlockType from '../../lib/utilities/blockHandlers';
import { RequestContext } from '../../contexts/RequestContext';

const Canonical = ({ blocks }) => {
  const { env, statsDestination, statsPageIdentifier } = React.useContext(
    RequestContext,
  );

  if (!blocks) {
    return null;
  }

  const aresMediaBlock = filterForBlockType(blocks, 'aresMedia');

  if (!aresMediaBlock) {
    return null;
  }

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
  return (
    <Video
      id={id}
      title={title}
      statsAppName="news"
      statsAppType="responsive"
      statsCountername={statsPageIdentifier}
      statsDestination={statsDestination}
      uiLocale="en-GB"
      mediaPlayerSettings={mediaPlayerSettings}
      width="100%"
      height="26em"
    />
  );
};

Canonical.propTypes = {
  ...videoComponentPropTypes,
};

export default Canonical;
