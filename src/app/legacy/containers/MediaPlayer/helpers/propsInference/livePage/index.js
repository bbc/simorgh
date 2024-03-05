import moment from 'moment-timezone';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';

import buildIChefURL from '#lib/utilities/ichefURL';
import { getPlaceholderSrcSet } from '#lib/utilities/srcSet';
import filterForBlockType from '#lib/utilities/blockHandlers';
import formatDuration from '#lib/utilities/formatDuration';

const DEFAULT_WIDTH = 512;

export default ({ assetId, assetType, blocks, isAmp, lang, translations }) => {
  const clipMediaBlock = filterForBlockType(blocks, 'clipMedia');

  if (!clipMediaBlock) {
    return { mediaBlock: null };
  }

  const captionBlock = filterForBlockType(blocks, 'caption');

  const { source, urlTemplate: locator } = pathOr(
    {},
    ['model', 'images', 1],
    clipMediaBlock,
  );
  const originCode = source.replace('Image', '');
  const pid = path(['model', 'video', 'id'], clipMediaBlock);
  const versionId = path(['model', 'video', 'version', 'id'], clipMediaBlock);

  const format = path(['model', 'type'], clipMediaBlock);

  const clipISO8601Duration = path(
    ['model', 'video', 'version', 'duration'],
    clipMediaBlock,
  );
  const rawDuration = moment.duration(clipISO8601Duration).asSeconds();
  const duration = moment.duration(rawDuration, 'seconds');
  const durationSpokenPrefix = pathOr(
    'Duration',
    ['media', 'duration'],
    translations,
  );
  const separator = ',';
  const mediaInfo = {
    title: path(['model', 'video', 'title'], clipMediaBlock),
    kind: pathOr(
      'programme',
      ['model', 'video', 'video', 'kind'],
      clipMediaBlock,
    ),
    duration: formatDuration({ duration, padMinutes: true }),
    rawDuration,
    durationSpoken: `${durationSpokenPrefix} ${formatDuration({
      duration,
      separator,
    })}`,
    datetime: clipISO8601Duration,
    type: format === 'audio' ? 'audio' : 'video',
    guidanceMessage: path(
      ['model', 'video', 'video', 'guidance', 'warnings', 'short'],
      clipMediaBlock,
    ),
  };

  const placeholderSrcset = getPlaceholderSrcSet({ originCode, locator });
  const placeholderSrc = buildIChefURL({
    originCode,
    locator,
    resolution: DEFAULT_WIDTH,
  });

  const noJsMessage = `This ${mediaInfo.type} cannot play in your browser. Please enable JavaScript or try a different browser.`;
  const contentNotAvailableMessage = `This content is no longer available`;

  const translatedNoJSMessage =
    path(['media', 'noJs'], translations) || noJsMessage;

  const translatedExpiredContentMessage =
    path(['media', 'contentExpired'], translations) ||
    contentNotAvailableMessage;

  const embedUrlParams = {
    mediaId: `${assetId}/${pid}/${lang}`,
    type: assetType,
    isAmp,
  };

  const iframeTitle = pathOr(
    'Media player',
    ['mediaAssetPage', 'mediaPlayer'],
    translations,
  );

  return {
    captionBlock,
    clipId: versionId,
    embedUrlParams,
    iframeTitle,
    mediaBlock: clipMediaBlock,
    mediaInfo,
    placeholderSrc,
    placeholderSrcset,
    translatedExpiredContentMessage,
    translatedNoJSMessage,
  };
};
