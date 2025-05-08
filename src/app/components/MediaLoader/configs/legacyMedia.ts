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

  const items = playlist?.map(item => ({
    href: item.url,
    kind: 'programme',
  }));

  return {
    mediaType: format || 'video',
    playerConfig: {
      ...basePlayerConfig,
      playlistObject: {
        title: mediaOverrides?.pageTitleOverride || '',
        holdingImageURL: image?.href,
        items,
      },
      ui: basePlayerConfig.ui,
      statsObject: basePlayerConfig.statsObject,
    },
    placeholderConfig,
    showAds: false,
  };
};
