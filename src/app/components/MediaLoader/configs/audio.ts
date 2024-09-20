import filterForBlockType from '#lib/utilities/blockHandlers';
import { ConfigBuilderProps, ConfigBuilderReturnProps } from '../types';

export default ({
  blocks,
  basePlayerConfig,
}: ConfigBuilderProps): ConfigBuilderReturnProps => {
  const { model: audioMediaBlock } = filterForBlockType(blocks, 'audio');
  const audio = audioMediaBlock?.versions?.[0] || {};
  const holdingImageURL = `https://${audioMediaBlock.imageUrl}`;

  return {
    playerConfig: {
      ...basePlayerConfig,
      autoplay: false,
      statsObject: {
        ...basePlayerConfig.statsObject,
        episodePID: audioMediaBlock.id,
      },
      playlistObject: {
        title: audioMediaBlock.episodeTitle,
        holdingImageURL,
        items: [
          {
            versionID: audio?.versionId,
            kind: audioMediaBlock.smpKind,
            duration: audio?.duration,
          },
        ],
        summary: audioMediaBlock.synopses.short,
        ...(audioMediaBlock.embedding && { embedRights: 'allowed' }),
      },
      ui: {
        ...basePlayerConfig.ui,
        skin: 'audio',
        colour: '#B80000',
        foreColour: '#222222',
        baseColour: '#222222',
        colourOnBaseColour: '#ffffff',
        fallbackBackgroundColour: '#ffffff',
        controls: { enabled: true, volumeSlider: true },
      },
    },

    mediaType: 'audio',
    showAds: false,
  };
};
