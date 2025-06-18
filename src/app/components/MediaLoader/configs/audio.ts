import filterForBlockType from '#lib/utilities/blockHandlers';
import { ConfigBuilderProps, ConfigBuilderReturnProps } from '../types';
import AUDIO_UI_CONFIG from './constants';

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
        title: audioMediaBlock.title,
        holdingImageURL,
        items: [
          {
            versionID: audio?.versionId,
            kind: audioMediaBlock.smpKind,
            duration: audio?.duration,
          },
        ],
        summary: audioMediaBlock.synopses.short,
      },
      ui: {
        ...basePlayerConfig.ui,
        ...AUDIO_UI_CONFIG,
      },
      superResponsive: false,
    },
    mediaType: 'audio',
    showAds: false,
  };
};
