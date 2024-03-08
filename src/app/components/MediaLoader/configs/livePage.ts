import moment from 'moment-timezone';

import buildIChefURL from '#lib/utilities/ichefURL';
import filterForBlockType from '#lib/utilities/blockHandlers';
import { ClipMediaBlock, MediaBlock, PlayerConfig } from '../types';

const DEFAULT_WIDTH = 512;

type Props = {
  blocks: MediaBlock[];
  basePlayerConfig: PlayerConfig;
};

type ReturnProps = {
  mediaType: string;
  playerConfig: PlayerConfig;
} | null;

export default ({ blocks, basePlayerConfig }: Props): ReturnProps => {
  const clipMediaBlock: ClipMediaBlock = filterForBlockType(
    blocks,
    'clipMedia',
  );

  if (!clipMediaBlock) return null;

  const { images, video, type } = clipMediaBlock?.model;

  const { source, urlTemplate: locator } = images?.[1] ?? {};

  const originCode = source?.replace('Image', '');
  const versionId = video?.version?.id;
  const clipISO8601Duration = video?.version?.duration;

  const rawDuration = moment.duration(clipISO8601Duration).asSeconds();

  const title = video?.title;
  const kind = video?.version?.kind || 'programme';
  const guidanceMessage = video?.version?.guidance?.warnings?.short;

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
        holdingImageURL: placeholderSrc,
        items: [
          {
            versionID: versionId,
            kind,
            duration: rawDuration,
          },
        ],
        ...(guidanceMessage && { guidance: guidanceMessage }),
      },
      ui: {
        ...basePlayerConfig.ui,
        ...(type === 'audio' && audioUi),
      },
    },
  };
};
