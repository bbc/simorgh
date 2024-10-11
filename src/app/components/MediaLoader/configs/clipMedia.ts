import moment from 'moment-timezone';

import buildIChefURL from '#lib/utilities/ichefURL';
import filterForBlockType from '#lib/utilities/blockHandlers';
import {
  ClipMediaBlock,
  ConfigBuilderProps,
  ConfigBuilderReturnProps,
  PlaylistItem,
} from '../types';
import getCaptionBlock from '../utils/getCaptionBlock';
import buildPlaceholderConfig from '../utils/buildPlaceholderConfig';
import shouldDisplayAds from '../utils/shouldDisplayAds';
import { getExternalEmbedUrl } from '../utils/urlConstructors';
import AUDIO_UI_CONFIG from './constants';

const DEFAULT_WIDTH = 512;

export default ({
  id,
  lang,
  blocks,
  basePlayerConfig,
  translations,
  adsEnabled = false,
  showAdsBasedOnLocation = false,
}: ConfigBuilderProps): ConfigBuilderReturnProps => {
  const clipMediaBlock: ClipMediaBlock = filterForBlockType(
    blocks,
    'clipMedia',
  );

  const { images, video, type } = clipMediaBlock?.model;

  const { source, urlTemplate: locator } = images?.[1] ?? {};

  const originCode = source?.replace('Image', '');

  const versionID = video?.version?.id;

  const clipISO8601Duration = video?.version?.duration;

  const rawDuration = moment.duration(clipISO8601Duration).asSeconds();

  const title = video?.title;

  const videoId = video?.id;

  const captionBlock = getCaptionBlock(blocks, 'live');

  const caption =
    captionBlock?.model?.blocks?.[0]?.model?.blocks?.[0]?.model?.text;

  const kind = video?.version?.kind || 'programme';

  const guidanceMessage = video?.version?.guidance;

  const showAds = shouldDisplayAds({
    adsEnabled,
    showAdsBasedOnLocation,
    duration: rawDuration,
  });

  const embeddingAllowed = video?.isEmbeddingAllowed ?? false;

  const holdingImageURL = buildIChefURL({
    originCode,
    locator,
    resolution: DEFAULT_WIDTH,
  });

  const placeholderConfig = buildPlaceholderConfig({
    title,
    duration: rawDuration,
    durationISO8601: clipISO8601Duration,
    type: type || 'video',
    holdingImageURL,
    placeholderImageLocator: locator,
    placeholderImageOriginCode: originCode,
    translations,
    guidanceMessage,
  });

  const items: PlaylistItem[] = [{ versionID, kind, duration: rawDuration }];

  if (showAds) items.unshift({ kind: 'advert' });

  const externalEmbedUrl = getExternalEmbedUrl({ id, versionID, lang });

  return {
    mediaType: type || 'video',
    playerConfig: {
      ...basePlayerConfig,
      ...(externalEmbedUrl && { externalEmbedUrl }),
      playlistObject: {
        title,
        summary: caption || '',
        holdingImageURL,
        items,
        ...(guidanceMessage && { guidance: guidanceMessage }),
        ...(embeddingAllowed && { embedRights: 'allowed' }),
      },
      ui: {
        ...basePlayerConfig.ui,
        ...(type === 'audio' && AUDIO_UI_CONFIG),
      },
      statsObject: {
        ...basePlayerConfig.statsObject,
        ...(videoId && { clipPID: videoId }),
      },
    },
    placeholderConfig,
    showAds,
  };
};
