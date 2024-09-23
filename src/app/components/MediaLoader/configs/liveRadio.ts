import filterForBlockType from '#lib/utilities/blockHandlers';
import {
  LiveRadioBlock,
  LiveRadioHeadingBlock,
  LiveRadioParagraphBlock,
  LiveRadioVersionBlock,
} from '#app/models/types/media';
import { ConfigBuilderProps, ConfigBuilderReturnProps } from '../types';

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
        skin: 'audio',
        colour: '#b80000',
        foreColour: '#222222',
        baseColour: '#222222',
        colourOnBaseColour: '#ffffff',
        fallbackBackgroundColour: '#ffffff',
        controls: { enabled: true, volumeSlider: true },
      },
    },
    mediaType: 'liveRadio',
    showAds: false,
  };
};
