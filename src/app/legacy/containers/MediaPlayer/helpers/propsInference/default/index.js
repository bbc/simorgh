import moment from 'moment-timezone';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';

import buildIChefURL from '#lib/utilities/ichefURL';
import { getPlaceholderSrcSet } from '#lib/utilities/srcSet';
import filterForBlockType from '#lib/utilities/blockHandlers';
import formatDuration from '#lib/utilities/formatDuration';

const DEFAULT_WIDTH = 512;

export default ({
  assetId,
  assetType,
  blocks,
  isAmp,
  isLegacyMedia,
  lang,
  translations,
}) => {
  const aresMediaBlock = filterForBlockType(blocks, 'aresMedia');

  if (!aresMediaBlock) {
    return { mediaBlock: null };
  }

  const articleCaptionBlock = filterForBlockType(blocks, 'caption');
  const cpsCaptionBlock = filterForBlockType(
    path(['model', 'blocks'], aresMediaBlock),
    'caption',
  );
  const { webcastVersions = [] } =
    aresMediaBlock?.model?.blocks?.[0]?.model ?? [];

  const hasWebcastItems = webcastVersions.length > 0;

  const versionParameter = hasWebcastItems ? 'webcastVersions' : 'versions';
  const captionBlock = articleCaptionBlock || cpsCaptionBlock;

  const { originCode, locator } = pathOr(
    {},
    ['model', 'blocks', 1, 'model', 'blocks', 0, 'model'],
    aresMediaBlock,
  );
  const versionId = path(
    ['model', 'blocks', 0, 'model', versionParameter, 0, 'versionId'],
    aresMediaBlock,
  );

  const blockId = path(
    ['model', 'blocks', 0, 'model', 'blockId'],
    aresMediaBlock,
  );

  const format = path(
    ['model', 'blocks', 0, 'model', 'format'],
    aresMediaBlock,
  );
  const rawDuration = path(
    ['model', 'blocks', 0, 'model', versionParameter, 0, 'duration'],
    aresMediaBlock,
  );
  const duration = moment.duration(rawDuration, 'seconds');
  const durationSpokenPrefix = pathOr(
    'Duration',
    ['media', 'duration'],
    translations,
  );
  const separator = ',';

  const mediaInfo = {
    title: path(['model', 'blocks', 0, 'model', 'title'], aresMediaBlock),
    kind: pathOr(
      'programme',
      ['model', 'blocks', 0, 'model', 'smpKind'],
      aresMediaBlock,
    ),
    duration: formatDuration({ duration, padMinutes: true }),
    durationSpoken: `${durationSpokenPrefix} ${formatDuration({
      duration,
      separator,
    })}`,
    rawDuration,
    datetime: path(
      ['model', 'blocks', 0, 'model', versionParameter, 0, 'durationISO8601'],
      aresMediaBlock,
    ),
    type: format === 'audio' ? 'audio' : 'video',
    guidanceMessage: path(
      ['model', 'blocks', 0, 'model', versionParameter, 0, 'warnings', 'short'],
      aresMediaBlock,
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
    mediaId: `${assetId}/${isLegacyMedia ? blockId : versionId}/${lang}`,
    type: assetType,
    isAmp,
  };

  const iframeTitle = pathOr(
    'Media player',
    ['mediaAssetPage', 'mediaPlayer'],
    translations,
  );

  return {
    blockId,
    captionBlock,
    clipId: versionId,
    embedUrlParams,
    iframeTitle,
    mediaBlock: aresMediaBlock,
    mediaInfo,
    placeholderSrc,
    placeholderSrcset,
    translatedExpiredContentMessage,
    translatedNoJSMessage,
  };
};
