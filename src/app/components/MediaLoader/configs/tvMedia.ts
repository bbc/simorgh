import moment from 'moment-timezone';

import buildIChefURL from '#lib/utilities/ichefURL';
import filterForBlockType from '#lib/utilities/blockHandlers';
import formatDuration from '#lib/utilities/formatDuration';
import { getPlaceholderSrcSet } from '#app/lib/utilities/srcSet';
import { TvMediaBlock } from '../types';
import getCaptionBlock from '../utils/getCaptionBlock';

const DEFAULT_WIDTH = 512;
const MIN_DURATION_FOR_PREROLLS = 30;

export default ({
  blocks,
  basePlayerConfig,
  translations,
  adsEnabled = false,
  showAdsBasedOnLocation = false,
}: ConfigBuilderProps): ConfigBuilderReturnProps => {
  const TvMediaBlock: TvMediaBlock = filterForBlockType(blocks, 'clipMedia');

  // const { images, video, type } = clipMediaBlock?.model;

  const { source, urlTemplate: locator } = images?.[1] ?? {};

  const originCode = source?.replace('Image', '');

  const versionID = video?.version?.id;

  const clipISO8601Duration = video?.version?.duration;

  const rawDuration = moment.duration(clipISO8601Duration).asSeconds();
  const duration = moment.duration(rawDuration, 'seconds');

  const title = video?.title;

  const captionBlock = getCaptionBlock(blocks, 'live');

  const caption =
    captionBlock?.model?.blocks?.[0]?.model?.blocks?.[0]?.model?.text;

  const kind = video?.version?.kind || 'programme';

  const guidanceMessage = video?.version?.guidance;

  const durationSpokenPrefix = translations?.media?.duration || 'Duration';

  const mediaInfo = {
    title,
    kind,
    duration: formatDuration({ duration, padMinutes: true }),
    rawDuration,
    durationSpoken: `${durationSpokenPrefix} ${formatDuration({
      duration,
      separator: ',',
    })}`,
    datetime: clipISO8601Duration,
    type: type || 'video',
    guidanceMessage,
  };

  const allowAdsForVideoDuration = rawDuration >= MIN_DURATION_FOR_PREROLLS;
  const showAds = [
    adsEnabled,
    showAdsBasedOnLocation,
    allowAdsForVideoDuration,
  ].every(Boolean);

  const embeddingAllowed = video?.isEmbeddingAllowed ?? false;

  const placeholderSrc = buildIChefURL({
    originCode,
    locator,
    resolution: DEFAULT_WIDTH,
  });

  const placeholderSrcset = getPlaceholderSrcSet({
    originCode,
    locator,
    isWebP: true,
  });

  const noJsMessage = `This ${type} cannot play in your browser. Please enable JavaScript or try a different browser.`;

  const audioUi = {
    skin: 'audio',
    colour: '#b80000',
    foreColour: '#222222',
    baseColour: '#222222',
    colourOnBaseColour: '#ffffff',
    fallbackBackgroundColour: '#ffffff',
    controls: { enabled: true, volumeSlider: true },
  };

  const items = [{ versionID, kind, duration: rawDuration }];
  if (showAds) items.unshift({ kind: 'advert' });

  return {
    mediaType: type || 'video',
    playerConfig: {
      ...basePlayerConfig,
      playlistObject: {
        title,
        summary: caption || '',
        holdingImageURL: placeholderSrc,
        items,
        ...(guidanceMessage && { guidance: guidanceMessage }),
        ...(embeddingAllowed && { embedRights: 'allowed' }),
      },
      ui: {
        ...basePlayerConfig.ui,
        ...(type === 'audio' && audioUi),
      },
      statsObject: {
        ...basePlayerConfig.statsObject,
        clipPID: versionID,
      },
    },
    placeholderConfig: {
      mediaInfo,
      placeholderSrc,
      placeholderSrcset,
      translatedNoJSMessage: noJsMessage,
    },
    showAds,
  };
};
