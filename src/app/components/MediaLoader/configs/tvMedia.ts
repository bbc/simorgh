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
  // console.log(tvMediaBlock.imageUrl);

  const [tvMediaBlock] = blocks;
  console.log(tvMediaBlock);

  return {
    ...basePlayerConfig,
    superResponsive: true,
    statsObject: {
      ...basePlayerConfig.statsObject,
      // showing up as mundo instead of hindi? could this be because of the base settings in the test file?
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
  };
};
