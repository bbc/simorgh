import moment from 'moment-timezone';

import buildIChefURL from '#lib/utilities/ichefURL';
import filterForBlockType from '#lib/utilities/blockHandlers';
import formatDuration from '#lib/utilities/formatDuration';
import { Translations } from '#app/models/types/translations';
import { MediaBlock } from '../types';

const DEFAULT_WIDTH = 512;

type Props = {
  blocks: MediaBlock[];
  translations: Translations;
};

export default ({ blocks, translations }: Props) => {
  const clipMediaBlock = filterForBlockType(blocks, 'clipMedia');

  if (!clipMediaBlock) return null;

  const { source, urlTemplate: locator } = clipMediaBlock?.model?.images?.[1];

  const originCode = source.replace('Image', '');
  const versionId = clipMediaBlock?.model?.video?.version?.id;
  const format = clipMediaBlock?.model?.type;
  const clipISO8601Duration = clipMediaBlock?.model?.video?.version?.duration;

  const rawDuration = moment.duration(clipISO8601Duration).asSeconds();
  const duration = moment.duration(rawDuration, 'seconds');

  const durationSpokenPrefix = translations?.media?.duration || 'Duration';

  const mediaInfo = {
    title: clipMediaBlock?.model?.video?.title,
    kind: clipMediaBlock?.model?.video?.video?.kind || 'programme',
    duration: formatDuration({ duration, padMinutes: true }),
    rawDuration,
    durationSpoken: `${durationSpokenPrefix} ${formatDuration({
      duration,
      separator: ',',
    })}`,
    datetime: clipISO8601Duration,
    type: format === 'audio' ? 'audio' : 'video',
    guidanceMessage:
      clipMediaBlock?.model?.video?.video?.guidance?.warnings?.short,
  };

  const placeholderSrc = buildIChefURL({
    originCode,
    locator,
    resolution: DEFAULT_WIDTH,
  });

  return {
    mediaType: mediaInfo.type,
    pagePlayerSettings: {
      playlistObject: {
        title: mediaInfo.title,
        holdingImageURL: placeholderSrc,
        items: [
          {
            versionID: versionId,
            kind: mediaInfo.kind,
            duration: rawDuration,
          },
        ],
        ...(mediaInfo.guidanceMessage && {
          guidance: mediaInfo.guidanceMessage,
        }),
      },
    },
  };
};
