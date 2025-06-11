import moment from 'moment-timezone';
import filterForBlockType from '#lib/utilities/blockHandlers';
import {
  PortraitClipMediaBlock,
  ConfigBuilderProps,
  ConfigBuilderReturnProps,
  PlaylistItem,
} from '../types';

const DEFAULT_WIDTH = 512;

export const setImageWidth = (url?: string) =>
  url?.replace('{width}', String(DEFAULT_WIDTH));

export default ({
  blocks,
  basePlayerConfig,
}: ConfigBuilderProps): ConfigBuilderReturnProps => {
  const { model }: PortraitClipMediaBlock =
    filterForBlockType(blocks, 'portraitClipMedia') ?? {};

  const { video, images = [] } = model;

  const { id, title, version } = video;

  const [fallbackImage, portraitImage] = images;

  const holdingImageURL = setImageWidth(
    (portraitImage || fallbackImage)?.urlTemplate,
  );

  const items: PlaylistItem[] = [
    {
      versionID: version?.id,
      kind: version?.kind,
      duration: moment.duration(version?.duration || 'PT0S').asSeconds(),
    },
  ];

  return {
    mediaType: 'video',
    playerConfig: {
      ...basePlayerConfig,
      autoplay: true,
      supportFakeFullscreen: true,
      playlistObject: {
        title,
        holdingImageURL,
        items,
      },
      plugins: {
        toLoad: [{ html: '/smpPlugins/fullscreen.js', playerOnly: true }],
      },
      ui: {
        ...basePlayerConfig.ui,
        swipable: {
          enabled: true,
          direction: 'Y',
        },
        controls: {
          enabled: true,
          includeNextButton: true,
          includePreviousButton: true,
        },
        fullscreen: { enabled: false },
      },
      statsObject: {
        ...basePlayerConfig.statsObject,
        ...(id && { clipPID: id }),
      },
    },
    showAds: false,
    orientation: 'portrait',
  };
};
