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
  const portraitClipMediaBlock: PortraitClipMediaBlock = filterForBlockType(
    blocks,
    'portraitClipMedia',
  );

  const { model = {} } = portraitClipMediaBlock || {};
  const { video, images, type = 'video' } = model as any;

  const versionID = video?.version?.id;
  const kind = video?.version?.kind || 'programme';
  const duration = moment
    .duration(video?.version?.duration || 'PT0S')
    .asSeconds();

  const captionBlock = getCaptionBlock(blocks, 'live');
  const caption =
    captionBlock?.model?.blocks?.[0]?.model?.blocks?.[0]?.model?.text;

  const holdingImageURL = buildIChefURL({
    originCode: images?.[1]?.source?.replace('Image', '') ?? '',
    locator: images?.[1]?.urlTemplate ?? '',
    resolution: DEFAULT_WIDTH,
  });

  // multiple hardcoded minimal playlist to test SMP vertical swipe
  const playlistItems: PlaylistItem[] = [
    { versionID, kind, duration },
    { versionID, kind, duration },
    { versionID, kind, duration },
    { versionID, kind, duration },
    { versionID, kind, duration },
    { versionID, kind, duration },
    { versionID, kind, duration },
    { versionID, kind, duration },
  ];

  const showAds = shouldDisplayAds({
    adsEnabled,
    showAdsBasedOnLocation,
    duration,
  });

  if (showAds) {
    playlistItems.unshift({ kind: 'advert' });
  }

  const externalEmbedUrl = getExternalEmbedUrl({
    id,
    versionID,
    lang,
  });

  return {
    mediaType: type,
    playerConfig: {
      ...basePlayerConfig,
      ...(externalEmbedUrl && { externalEmbedUrl }),
      autoplay: true,
      playlistObject: {
        title: video?.title,
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

        ...(type === 'audio' && AUDIO_UI_CONFIG),
      },
      statsObject: {
        ...basePlayerConfig.statsObject,
        ...(video?.id && { clipPID: video.id }),
      },
    },
    showAds,
    orientation: 'portrait',
  };
};
