import filterForBlockType from '#lib/utilities/blockHandlers';
import {
  LiveRadioBlock,
  // LiveRadioHeadingBlock,
  // LiveRadioParagraphBlock,
  // LiveRadioVersionBlock,
} from '#app/models/types/media';
import { ConfigBuilderProps, ConfigBuilderReturnProps } from '../types';
import AUDIO_UI_CONFIG from './constants';

export default ({
  blocks,
  basePlayerConfig,
}: ConfigBuilderProps): ConfigBuilderReturnProps => {
  const { model: liveRadioBlocks }: LiveRadioBlock =
    filterForBlockType(blocks, 'liveRadio') ?? {};

  // const headingBlock: LiveRadioHeadingBlock =
  //   filterForBlockType(liveRadioBlocks, 'heading') ?? {};

  // const paragraphBlock: LiveRadioParagraphBlock =
  //   filterForBlockType(liveRadioBlocks, 'paragraph') ?? {};

  // const liveRadioMetadataBlock: LiveRadioVersionBlock =
  //   filterForBlockType(liveRadioBlocks, 'version') ?? {};

  return {
    playerConfig: {
      ...basePlayerConfig,
      autoplay: false,
      playlistObject: {
        // json?.data?.curations?.[0]?.mediaCollection?.[0]?.model?.overtypedTitle; -- Probs this
        // json?.data?.curations?.[0]?.mediaCollection?.[0]?.model?.title;
        // json?.data?.curations?.[0]?.title;
        title: liveRadioBlocks.overtypedTitle ?? '',
        items: [
          {
            kind: 'radioProgramme',
            live: true,
            // json?.data?.curations?.[0]?.mediaCollection?.[0]?.model?.masterbrand.id
            serviceID: liveRadioBlocks?.masterbrand?.id ?? '',
          },
        ],
        liveRewind: true,
        simulcast: true,
        // Don't see a direct equivalent afrique radio has Infos, musique et sports
        // Closest equivalent is synopses
        // json?.data?.curations?.[0]?.mediaCollection?.[0]?.model?.synopses?.short;
        // json?.data?.curations?.[0]?.mediaCollection?.[0]?.model?.synopses?.medium;
        // json?.data?.curations?.[0]?.mediaCollection?.[0]?.model?.synopses?.long;
        summary: liveRadioBlocks?.synopses?.long ?? '',
      },
      ui: {
        ...basePlayerConfig.ui,
        ...AUDIO_UI_CONFIG,
      },
      superResponsive: false,
    },
    mediaType: 'liveRadio',
    showAds: false,
  };
};
