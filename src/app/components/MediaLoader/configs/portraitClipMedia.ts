import moment from 'moment-timezone';
import filterForBlockType from '#lib/utilities/blockHandlers';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import onClient from '#app/lib/utilities/onClient';
import { GROUP_3_MIN_WIDTH_BP } from '#app/components/ThemeProvider/mediaQueries';
import {
  PortraitClipMediaBlock,
  ConfigBuilderProps,
  ConfigBuilderReturnProps,
  PlaylistItem,
} from '../types';

export default ({
  blocks,
  basePlayerConfig,
}: ConfigBuilderProps): ConfigBuilderReturnProps => {
  const { model }: PortraitClipMediaBlock =
    filterForBlockType(blocks, 'portraitClipMedia') ?? {};

  const { video } = model;
  const { id, title, version, holdingImageURL } = video;

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

  let isMobile = false;

  if (onClient()) {
    const matchMedia = window.matchMedia(
      `(max-width: ${GROUP_3_MIN_WIDTH_BP}rem)`,
    );
    if (matchMedia.matches) {
      isMobile = true;
    } else {
      isMobile = false;
    }
  }

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
      ...(isMobile && {
        plugins: {
          toLoad: [
            {
              html: `${SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${SIMORGH_PUBLIC_STATIC_ASSETS_PATH}smpPlugins/fullscreen.js`,
              playerOnly: true,
            },
          ],
        },
      }),
      ui: {
        ...basePlayerConfig.ui,
        swipable: {
          enabled: true,
          direction: 'Y',
        },
        poster: {
          availableWhenSettingUp: true,
        },
        controls: {
          enabled: true,
          includeNextButton: isMobile,
          includePreviousButton: isMobile,
        },
        fullscreen: {
          enabled: isMobile,
          useCloseIconForExitFullscreen: true,
        },
        pictureInPicture: {
          enabled: false,
        },
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
