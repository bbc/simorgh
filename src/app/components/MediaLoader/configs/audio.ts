import filterForBlockType from '#lib/utilities/blockHandlers';
import { ConfigBuilderProps, ConfigBuilderReturnProps } from '../types';
import buildPlaceholderConfig from '../utils/buildPlaceholderConfig';

export default ({
  blocks,
  basePlayerConfig,
  translations,
}: ConfigBuilderProps): ConfigBuilderReturnProps => {
  const { model: audioMediaBlock } = filterForBlockType(blocks, 'audio');
  const audio = audioMediaBlock?.versions?.[0] || {};
  const holdingImageURL = `https://${audioMediaBlock.imageUrl}`;

  const placeholderConfig = buildPlaceholderConfig({
    title: audioMediaBlock.episodeTitle,
    duration: audio?.duration,
    durationISO8601: audio?.durationISO8601,
    type: 'audio',
    holdingImageURL,
    placeholderImageLocator: holdingImageURL,
    placeholderImageOriginCode: 'pips',
    translations,
  });

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
    },
    mediaType: 'audio',
    placeholderConfig,
    showAds: false,
  };
};
