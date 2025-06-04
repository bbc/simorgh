import moment from 'moment-timezone';
import buildIChefURL from '#lib/utilities/ichefURL';
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
  const firstBlock = filterForBlockType(
    blocks,
    'portraitClipMedia',
  ) as PortraitClipMediaBlock;

  if (!firstBlock) {
    return {
      mediaType: 'video',
      playerConfig: basePlayerConfig,
      showAds: false,
      orientation: 'portrait',
    };
  }

  const portraitClipMediaBlocks: PortraitClipMediaBlock[] = filterForBlockType(
    blocks,
    'portraitClipMedia',
    { multiple: true },
  ) as PortraitClipMediaBlock[];

  const playlistItems: PlaylistItem[] = portraitClipMediaBlocks.map(block => {
    const { model } = block;
    const { video, images } = model;
    const version = video?.version;

    // prefer portrait-oriented image if available (based on our bff structure) fallback to first available
    const image = images?.[1] || images?.[0];
    const originCode = image?.source?.replace('Image', '');
    const locator = image?.urlTemplate;

    return {
      versionID: version?.id,
      kind: version?.kind || 'programme',
      duration: moment.duration(version?.duration || 'PT0S').asSeconds(),
      embedRights: video?.isEmbeddingAllowed ? 'allowed' : undefined,
      vpid: video?.id,
      serviceID: version?.territories?.[0],
      title: video?.title,
      guidance: version?.guidance,
      territories: version?.territories,
      images,
      holdingImageURL:
        originCode && locator
          ? buildIChefURL({ originCode, locator, resolution: DEFAULT_WIDTH })
          : undefined,
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

  const holdingImageURL = buildIChefURL({
    originCode:
      firstBlock?.model?.images?.[1]?.source?.replace('Image', '') ?? '',
    locator: firstBlock?.model?.images?.[1]?.urlTemplate ?? '',
    resolution: DEFAULT_WIDTH,
  });

  return {
    mediaType: firstBlock?.model?.type ?? 'video',
    playerConfig: {
      ...basePlayerConfig,
      autoplay: true,
      playlistObject: {
        title: firstBlock?.model?.video?.title,
        holdingImageURL,
        items: playlistItems,
      },
      ui: {
        ...basePlayerConfig.ui,
        ...(firstBlock?.model?.type === 'audio' && AUDIO_UI_CONFIG),
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
        ...(firstBlock?.model?.video?.id && {
          clipPID: firstBlock.model.video.id,
        }),
      },
    },
    showAds,
    orientation: 'portrait',
  };
};
