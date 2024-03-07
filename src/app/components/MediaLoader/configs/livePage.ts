import moment from 'moment-timezone';

import buildIChefURL from '#lib/utilities/ichefURL';
import filterForBlockType from '#lib/utilities/blockHandlers';
import { ClipMediaBlock, MediaBlock } from '../types';

const DEFAULT_WIDTH = 512;

type Props = {
  blocks: MediaBlock[];
};

export default ({ blocks }: Props) => {
  const clipMediaBlock: ClipMediaBlock = filterForBlockType(
    blocks,
    'clipMedia',
  );

  if (!clipMediaBlock) return null;

  const { source, urlTemplate: locator } =
    clipMediaBlock?.model?.images?.[1] ?? {};

  const originCode = source?.replace('Image', '');
  const versionId = clipMediaBlock?.model?.video?.version?.id;
  const format = clipMediaBlock?.model?.type;
  const clipISO8601Duration = clipMediaBlock?.model?.video?.version?.duration;

  const rawDuration = moment.duration(clipISO8601Duration).asSeconds();

  const title = clipMediaBlock?.model?.video?.title;
  const kind = clipMediaBlock?.model?.video?.version?.kind || 'programme';
  const guidanceMessage =
    clipMediaBlock?.model?.video?.version?.guidance?.warnings?.short;

  const placeholderSrc = buildIChefURL({
    originCode,
    locator,
    resolution: DEFAULT_WIDTH,
  });

  return {
    mediaType: format === 'audio' ? 'audio' : 'video',
    pagePlayerSettings: {
      playlistObject: {
        title,
        holdingImageURL: placeholderSrc,
        items: [
          {
            versionID: versionId,
            kind,
            duration: rawDuration,
          },
        ],
        ...(guidanceMessage && { guidance: guidanceMessage }),
      },
    },
  };
};
