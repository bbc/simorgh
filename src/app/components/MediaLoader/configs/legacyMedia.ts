import { MediaOverrides } from '#app/models/types/media';
import filterForBlockType from '#lib/utilities/blockHandlers';
import {
  LegacyMediaBlock,
  ConfigBuilderProps,
  ConfigBuilderReturnProps,
} from '../types';
import buildPlaceholderConfig from '../utils/buildPlaceholderConfig';

export default ({
  blocks,
  basePlayerConfig,
  translations,
}: ConfigBuilderProps): ConfigBuilderReturnProps => {
  const legacyMediaBlock: LegacyMediaBlock =
    filterForBlockType(blocks, 'legacyMedia') ?? {};

  const { model: mediaOverrides }: MediaOverrides =
    filterForBlockType(blocks, 'mediaOverrides') || {};

  const { image, format, playlist } = legacyMediaBlock?.content ?? {};

  const placeholderConfig = buildPlaceholderConfig({
    title: mediaOverrides?.pageTitleOverride || '',
    type: format || 'video',
    holdingImageURL: image?.href,
    translations,
  });

  const mp4Items = playlist
    ?.filter(item => item.format === 'mp4')
    ?.map(item => ({ href: item.url, kind: 'programme' }));

  return {
    mediaType: format || 'video',
    playerConfig: {
      ...basePlayerConfig,
      playlistObject: {
        title: mediaOverrides?.pageTitleOverride || '',
        holdingImageURL: image?.href,
        items: mp4Items,
      },
      ui: basePlayerConfig.ui,
      statsObject: basePlayerConfig.statsObject,
    },
    placeholderConfig,
    showAds: false,
  };
};
