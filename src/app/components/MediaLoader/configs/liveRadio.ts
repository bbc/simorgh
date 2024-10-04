import filterForBlockType from '#lib/utilities/blockHandlers';
import {
  LiveRadioBlock,
  LiveRadioHeadingBlock,
  LiveRadioParagraphBlock,
  LiveRadioVersionBlock,
} from '#app/models/types/media';
import { ConfigBuilderProps, ConfigBuilderReturnProps } from '../types';
import AUDIO_UI_CONFIG from './constants';

export default ({
  blocks,
  basePlayerConfig,
}: ConfigBuilderProps): ConfigBuilderReturnProps => {
  const { model: liveRadioBlocks }: LiveRadioBlock =
    filterForBlockType(blocks, 'liveRadio') ?? {};

  const headingBlock: LiveRadioHeadingBlock =
    filterForBlockType(liveRadioBlocks, 'heading') ?? {};

  const paragraphBlock: LiveRadioParagraphBlock =
    filterForBlockType(liveRadioBlocks, 'paragraph') ?? {};

  const liveRadioMetadataBlock: LiveRadioVersionBlock =
    filterForBlockType(liveRadioBlocks, 'version') ?? {};

  return {
    playerConfig: {
      ...basePlayerConfig,
      autoplay: false,
      playlistObject: {
        title: headingBlock?.text ?? '',
        items: [
          {
            kind: 'radioProgramme',
            live: true,
            serviceID: liveRadioMetadataBlock?.externalId,
          },
        ],
        liveRewind: true,
        simulcast: true,
        summary: paragraphBlock?.text ?? '',
      },
      ui: {
        ...basePlayerConfig.ui,
        ...AUDIO_UI_CONFIG,
      },
    },
    mediaType: 'liveRadio',
    showAds: false,
  };
};
