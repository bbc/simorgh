import mediatorURL from '../mediatorUrl';
import filterForBlockType from '../../blockHandlers';
import deepGet from '../../deepGet';

const mediaPlayerSettings = ({
  aresMediaBlocks,
  env,
  statsDestination,
  statsPageIdentifier,
}) => {
  if (!aresMediaBlocks) {
    return null;
  }

  const aresMediaMetadata = filterForBlockType(
    aresMediaBlocks,
    'aresMediaMetadata',
  );
  const pid = deepGet(['model', 'id'], aresMediaMetadata);
  const nestedModel = deepGet(['model'], aresMediaMetadata);
  const kind =
    deepGet(['format'], nestedModel) === 'audio_video' ? 'programme' : 'audio';
  const subType = deepGet(['subType'], nestedModel);
  const title = deepGet(['title'], nestedModel);
  const version = deepGet(['versions', 0], nestedModel);
  const duration = deepGet(['duration'], version);
  const versionID = deepGet(['versionId'], version);
  const guidance = deepGet(['warnings', 'short'], version);
  const statsObject = { destination: statsDestination };
  if (subType === 'clip') {
    statsObject.clipPID = pid;
  } else if (subType === 'episode') {
    statsObject.episodePID = pid;
  }

  const aresMediaImage = filterForBlockType(aresMediaBlocks, 'image');
  const imageBlocks = deepGet(['model', 'blocks'], aresMediaImage);
  const rawImageBlock = filterForBlockType(imageBlocks, 'rawImage');
  const holdingImageUrl = deepGet(['model', 'locator'], rawImageBlock);

  const settings = {
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
    statsObject,
    superResponsive: true,
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

  return JSON.stringify(settings);
};

export default mediaPlayerSettings;
