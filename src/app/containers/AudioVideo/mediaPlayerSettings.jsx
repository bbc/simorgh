import React from 'react';
import mediatorURL from './helpers/mediatorUrl';
import { RequestContext } from '../../contexts/RequestContext';
import filterForBlockType from '../../lib/utilities/blockHandlers';
import deepGet from '../../lib/utilities/deepGet';

const MediaPlayerSettings = ({ blocks }) => {
  const { env, statsDestination, statsPageIdentifier } = React.useContext(
    RequestContext,
  );
  const aresMediaBlock = filterForBlockType(blocks, 'aresMedia');

  if (!aresMediaBlock) {
    return null;
  }
  const pid = deepGet(['model', 'blocks', 0, 'model', 'id'], aresMediaBlock);
  const nestedModel = deepGet(['model', 'blocks', 0, 'model'], aresMediaBlock);
  const kind =
    deepGet(['format'], nestedModel) === 'audio_video' ? 'programme' : 'audio';
  const subType = deepGet(['subType'], nestedModel);
  const title = deepGet(['title'], nestedModel);
  const version = deepGet(['versions', 0], nestedModel);
  const duration = deepGet(['duration'], version);
  const versionID = deepGet(['versionId'], version);
  const holdingImageUrl = deepGet(
    ['blocks', 1, 'model', 'blocks', 0, 'model', 'locator'],
    aresMediaBlock.model,
  );
  const guidance = deepGet(['warnings', 'short'], version);

  const statsObject = { destination: statsDestination };

  if (subType === 'clip') {
    statsObject.clipPID = pid;
  } else if (subType === 'episode') {
    statsObject.episodePID = pid;
  }

  return {
    appName: 'news',
    appType: 'responsive',
    counterName: statsPageIdentifier,
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
    product: 'news',
    responsive: true,
    statsObject,
    ui: {
      cta: {
        mode: 'duration',
      },
      locale: {
        lang: 'en-GB',
      },
      subtitles: {
        defaultOn: true,
        enabled: true,
      },
    },
  };
};

export default MediaPlayerSettings;
