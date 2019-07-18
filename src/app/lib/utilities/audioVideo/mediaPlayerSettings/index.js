import pathOr from 'ramda/src/pathOr';
import mediatorURL from '../mediatorUrl';
import filterForBlockType from '../../blockHandlers';

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
  const pid = pathOr(null, ['model', 'id'], aresMediaMetadata);
  const nestedModel = pathOr(null, ['model'], aresMediaMetadata);
  const kind =
    pathOr(null, ['format'], nestedModel) === 'audio_video'
      ? 'programme'
      : 'audio';
  const subType = pathOr(null, ['subType'], nestedModel);
  const title = pathOr(null, ['title'], nestedModel);
  const version = pathOr(null, ['versions', 0], nestedModel);
  const duration = pathOr(null, ['duration'], version);
  const versionID = pathOr(null, ['versionId'], version);
  const guidance = pathOr(null, ['warnings', 'short'], version);
  const statsObject = { destination: statsDestination };
  if (subType === 'clip') {
    statsObject.clipPID = pid;
  } else if (subType === 'episode') {
    statsObject.episodePID = pid;
  }

  const aresMediaImage = filterForBlockType(aresMediaBlocks, 'image');
  const imageBlocks = pathOr(null, ['model', 'blocks'], aresMediaImage);
  const rawImageBlock = filterForBlockType(imageBlocks, 'rawImage');
  const holdingImageUrl = pathOr(null, ['model', 'locator'], rawImageBlock);

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
