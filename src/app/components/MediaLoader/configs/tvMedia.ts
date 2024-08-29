import filterForBlockType from '#lib/utilities/blockHandlers';
import { ConfigBuilderProps, ConfigBuilderReturnProps } from '../types';
import buildPlaceholderConfig from '../utils/buildPlaceholderConfig';

export default ({
  blocks,
  basePlayerConfig,
  translations,
}: ConfigBuilderProps): ConfigBuilderReturnProps => {
  const { model: tvMediaBlock } = filterForBlockType(blocks, 'tvMedia');

  const placeholderConfig = buildPlaceholderConfig({
    title: tvMediaBlock?.episodeTitle,
    duration: tvMediaBlock?.versions?.[0]?.duration,
    durationISO8601: tvMediaBlock?.versions?.[0]?.durationISO8601,
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
            versionID: tvMediaBlock.versions[0].versionId,
            kind: tvMediaBlock.smpKind,
            duration: tvMediaBlock.versions[0].duration,
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
