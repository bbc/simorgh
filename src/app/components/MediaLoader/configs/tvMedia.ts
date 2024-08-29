import filterForBlockType from '#lib/utilities/blockHandlers';
import { ConfigBuilderProps, ConfigBuilderReturnProps } from '../types';
import buildPlaceholderConfig from '../utils/buildPlaceholderConfig';

export default ({
  blocks,
  basePlayerConfig,
  translations,
}: ConfigBuilderProps): ConfigBuilderReturnProps => {
  const { model: tvMediaBlock } = filterForBlockType(blocks, 'tvMedia');
  const video = tvMediaBlock?.versions?.[0] || {};

  const placeholderConfig = buildPlaceholderConfig({
    title: tvMediaBlock.episodeTitle,
    duration: video?.duration,
    durationISO8601: video?.durationISO8601,
    type: 'video',
    holdingImageURL: `https://${tvMediaBlock.imageUrl}`,
    placeholderImageLocator: `https://${tvMediaBlock.imageUrl}`,
    placeholderImageOriginCode: 'pips',
    translations,
  });

  return {
    playerConfig: {
      ...basePlayerConfig,
      autoplay: false,
      statsObject: {
        ...basePlayerConfig.statsObject,
        episodePID: tvMediaBlock.id,
      },
      playlistObject: {
        title: tvMediaBlock.episodeTitle,
        holdingImageURL: `https://${tvMediaBlock.imageUrl}`,
        items: [
          {
            versionID: video?.versionId,
            kind: tvMediaBlock.smpKind,
            duration: video?.duration,
          },
        ],
        summary: tvMediaBlock.synopses.short,
        ...(tvMediaBlock.embedding && { embedRights: 'allowed' }),
      },
    },
    mediaType: 'video',
    placeholderConfig,
    showAds: false,
  };
};
