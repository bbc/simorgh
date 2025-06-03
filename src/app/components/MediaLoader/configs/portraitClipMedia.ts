import moment from 'moment-timezone';
import buildIChefURL from '#lib/utilities/ichefURL';
import filterForBlockType from '#lib/utilities/blockHandlers';
import {
  PortraitClipMediaBlock,
  ConfigBuilderProps,
  ConfigBuilderReturnProps,
  PlaylistItem,
} from '../types';
import getCaptionBlock from '../utils/getCaptionBlock';
import shouldDisplayAds from '../utils/shouldDisplayAds';
import { getExternalEmbedUrl } from '../utils/urlConstructors';
import AUDIO_UI_CONFIG from './constants';

const DEFAULT_WIDTH = 512;

export default ({
  id,
  lang,
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

  const captionBlock = getCaptionBlock(blocks, 'live');
  const caption =
    captionBlock?.model?.blocks?.[0]?.model?.blocks?.[0]?.model?.text;

  const holdingImageURL = buildIChefURL({
    originCode:
      firstBlock?.model?.images?.[1]?.source?.replace('Image', '') ?? '',
    locator: firstBlock?.model?.images?.[1]?.urlTemplate ?? '',
    resolution: DEFAULT_WIDTH,
  });

  const externalEmbedUrl = getExternalEmbedUrl({
    id,
    versionID: firstBlock?.model?.video?.version?.id,
    lang,
  });

  return {
    mediaType: firstBlock?.model?.type ?? 'video',
    playerConfig: {
      ...basePlayerConfig,
      ...(externalEmbedUrl && { externalEmbedUrl }),
      autoplay: true,
      playlistObject: {
        title: firstBlock?.model?.video?.title,
        summary: caption || '',
        holdingImageURL,
        items: playlistItems,
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
        ...(firstBlock?.model?.type === 'audio' && AUDIO_UI_CONFIG),
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
