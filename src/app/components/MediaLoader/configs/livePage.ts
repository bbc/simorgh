import moment from 'moment-timezone';

import buildIChefURL from '#lib/utilities/ichefURL';
import filterForBlockType from '#lib/utilities/blockHandlers';
import {
  ClipMediaBlock,
  ConfigBuilderProps,
  ConfigBuilderReturnProps,
} from '../types';
import getCaptionBlock from '../utils/getCaptionBlock';

const DEFAULT_WIDTH = 512;

export default ({
  blocks,
  basePlayerConfig,
}: ConfigBuilderProps): ConfigBuilderReturnProps => {
  const clipMediaBlock: ClipMediaBlock = filterForBlockType(
    blocks,
    'clipMedia',
  );

  if (!clipMediaBlock) return null;

  const { images, video, type } = clipMediaBlock?.model;

  const { source, urlTemplate: locator } = images?.[1] ?? {};

  const originCode = source?.replace('Image', '');

  const versionID = video?.version?.id;

  const clipISO8601Duration = video?.version?.duration;

  const duration = moment.duration(clipISO8601Duration).asSeconds();

  const title = video?.title;

  const captionBlock = getCaptionBlock(blocks, 'live');

  const caption =
    captionBlock?.model?.blocks?.[0]?.model?.blocks?.[0]?.model?.text;

  const kind = video?.version?.kind || 'programme';

  const guidanceMessage = video?.version?.guidance?.warnings?.short;

  const embeddingAllowed = video?.isEmbeddingAllowed ?? false;

  const placeholderSrc = buildIChefURL({
    originCode,
    locator,
    resolution: DEFAULT_WIDTH,
  });

  const audioUi = {
    skin: 'audio',
    colour: '#b80000',
    foreColour: '#222222',
    baseColour: '#222222',
    colourOnBaseColour: '#ffffff',
    fallbackBackgroundColour: '#ffffff',
    controls: { enabled: true, volumeSlider: true },
  };

  return {
    mediaType: type || 'video',
    playerConfig: {
      ...basePlayerConfig,
      playlistObject: {
        title,
        summary: caption || '',
        holdingImageURL: placeholderSrc,
        items: [{ versionID, kind, duration }],
        ...(guidanceMessage && { guidance: guidanceMessage }),
        ...(embeddingAllowed && { embedRights: 'allowed' }),
      },
      ui: {
        ...basePlayerConfig.ui,
        ...(type === 'audio' && audioUi),
      },
      statsObject: {
        ...basePlayerConfig.statsObject,
        clipPID: versionID,
      },
    },
  };
};
