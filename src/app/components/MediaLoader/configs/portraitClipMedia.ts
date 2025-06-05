import moment from 'moment-timezone';
import filterForBlockType from '#lib/utilities/blockHandlers';
import {
  PortraitClipMediaBlock,
  ConfigBuilderProps,
  ConfigBuilderReturnProps,
  PlaylistItem,
} from '../types';
import shouldDisplayAds from '../utils/shouldDisplayAds';
import AUDIO_UI_CONFIG from './constants';

const DEFAULT_WIDTH = 512;

export default ({
  blocks,
  basePlayerConfig,
  adsEnabled = false,
  showAdsBasedOnLocation = false,
}: ConfigBuilderProps): ConfigBuilderReturnProps => {
  const portraitClipMediaBlocks = filterForBlockType(
    blocks,
    'portraitClipMedia',
    { returnAllMatchingBlocks: true },
  ) as PortraitClipMediaBlock[];

  if (!portraitClipMediaBlocks?.length) {
    return {
      mediaType: 'video',
      playerConfig: basePlayerConfig,
      showAds: false,
      orientation: 'portrait',
    };
  }

  const playlistItems: PlaylistItem[] = portraitClipMediaBlocks.map(block => {
    const { model } = block;
    const { video, images } = model;
    const version = video?.version;
    // prefer portrait-oriented image if available (based on our bff structure) fallback to first available
    const image = images?.[1] || images?.[0];
    const holdingImageURL = image?.urlTemplate?.replace(
      '{width}',
      `${DEFAULT_WIDTH}`,
    );

    return {
      versionID: version?.id,
      kind: version?.kind || 'programme',
      duration: moment.duration(version?.duration || 'PT0S').asSeconds(),
      embedRights: video?.isEmbeddingAllowed ? 'allowed' : undefined,
      vpid: video?.id,
      serviceID: version?.territories?.[0],
      title: video?.title ?? '',
      guidance: version?.guidance,
      territories: version?.territories,
      images,
      holdingImageURL,
    };
  });

  const showAds = shouldDisplayAds({
    adsEnabled,
    showAdsBasedOnLocation,
    duration: playlistItems[0]?.duration ?? 0,
  });

  if (showAds) {
    playlistItems.unshift({ kind: 'advert' });
  }

  return {
    mediaType: 'video',
    playerConfig: {
      ...basePlayerConfig,
      autoplay: true,
      playlistObject: {
        title: playlistItems[0]?.title ?? '',
        holdingImageURL: playlistItems[0]?.holdingImageURL,
        items: playlistItems,
      },
      ui: {
        ...basePlayerConfig.ui,
        ...(portraitClipMediaBlocks[0]?.model?.type === 'audio' &&
          AUDIO_UI_CONFIG),
        swipable: {
          enabled: true,
          direction: 'Y',
        },
        controls: {
          enabled: true,
          includeNextButton: true,
          includePreviousButton: true,
        },
      },
      statsObject: {
        ...basePlayerConfig.statsObject,
        ...(playlistItems[0]?.vpid && {
          clipPID: playlistItems[0].vpid,
        }),
      },
    },
    showAds,
    orientation: 'portrait',
  };
};
