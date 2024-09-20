import filterForBlockType from '#lib/utilities/blockHandlers';
import { ConfigBuilderProps, ConfigBuilderReturnProps } from '../types';

export default ({
  blocks,
  basePlayerConfig,
  translations,
}: ConfigBuilderProps): ConfigBuilderReturnProps => {
  const { model: afriqueAudioMediaBlocks } = filterForBlockType(
    blocks,
    'audio',
  );
  const audio = afriqueAudioMediaBlocks?.versions?.[0] || {};
  const holdingImageURL = `https://${afriqueAudioMediaBlocks.imageUrl}`;

  return {
    playerConfig: {
      ...basePlayerConfig,
      autoplay: false,
      statsObject: {
        ...basePlayerConfig.statsObject,
        episodePID: afriqueAudioMediaBlocks.id,
      },
      playlistObject: {
        title: afriqueAudioMediaBlocks.episodeTitle,
        holdingImageURL,
        items: [
          {
            versionID: audio?.versionId,
            kind: afriqueAudioMediaBlocks.smpKind,
            duration: audio?.duration,
          },
        ],
        summary: afriqueAudioMediaBlocks.synopses.short,
        ...(afriqueAudioMediaBlocks.embedding && { embedRights: 'allowed' }),
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
