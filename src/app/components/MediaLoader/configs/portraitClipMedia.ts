import moment from 'moment-timezone';
import filterForBlockType from '#lib/utilities/blockHandlers';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
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

  const {
    SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN,
    SIMORGH_PUBLIC_STATIC_ASSETS_PATH,
  } = getEnvConfig();

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
        toLoad: [
          {
            html: `${SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${SIMORGH_PUBLIC_STATIC_ASSETS_PATH}smpPlugins/fullscreen.js`,
            playerOnly: true,
          },
        ],
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
        fullscreen: { enabled: true, useCloseIconForExitFullscreen: true },
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
