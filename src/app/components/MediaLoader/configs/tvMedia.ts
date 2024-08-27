import filterForBlockType from '#lib/utilities/blockHandlers';
import {
  ConfigBuilderProps,
  ConfigBuilderReturnProps,
  TvMediaBlock,
} from '../types';

export default ({
  blocks,
  basePlayerConfig,
  translations,
  adsEnabled = false,
  showAdsBasedOnLocation = false,
}: ConfigBuilderProps): ConfigBuilderReturnProps => {
  const [mediaBlock] = blocks as TvMediaBlock[];
  const { model: tvMediaBlock } = mediaBlock;

  const tvMedia: TvMediaBlock = filterForBlockType(blocks, 'tvMedia');

  const { type } = tvMedia?.model;

  console.log(translations);

  return {
    playerConfig: {
      ...basePlayerConfig,
      statsObject: {
        ...basePlayerConfig.statsObject,
        episodePID: tvMediaBlock.id,
      },
      playlistObject: {
        title: tvMediaBlock.episodeTitle,
        holdingImageURL: `https://${tvMediaBlock.imageUrl}`,
        items: [
          {
            versionID: tvMediaBlock.versions[0].versionId,
            kind: tvMediaBlock.smpKind,
            duration: tvMediaBlock.versions[0].duration,
            vpid: tvMediaBlock.versions[0].versionId,
          },
        ],
        summary: tvMediaBlock.synopses.short,
      },
    },
    mediaType: 'video',
    placeholderConfig: {
      mediaInfo: {
        title: 'दुनिया',
        datetime: undefined,
        duration: undefined,
        durationSpoken: undefined, // refer to clipMedia
        type: type || 'video',
        guidanceMessage: null,
      },
      placeholderSrc: '', // refer to clipMedia
      placeholderSrcset: '',
      translatedNoJSMessage: '',
    },
    showAds: adsEnabled && showAdsBasedOnLocation,
  };
};
