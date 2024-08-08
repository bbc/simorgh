import isNil from 'ramda/src/isNil';
import pick from 'ramda/src/pick';
import { AtomicVersionProps } from './types';

export default function convertAtomicVersionBlock({
  externalId,
  blocks,
  headline,
}: AtomicVersionProps & { headline?: string }) {
  const generateVideoBlock = () => {
    const block = blocks[0];

    const mediaHeadline = headline || block.caption;

    const generatedBlock = {
      type: 'aresMediaMetadata',
      blockId: `urn:bbc:ares::${block.subType}:${block.id}`,
      model: {
        ...pick(['embedding', 'id', 'subType', 'live'], block),
        // If available is undefined, the video is available
        available: isNil(block.available) ? true : block.available,
        format: block.format === 'video' ? 'audio_video' : block.format,
        title: mediaHeadline,
        imageCopyright: block?.image?.copyrightHolder,
        imageUrl: block?.image?.href,
        synopses: {
          short: mediaHeadline,
          medium: mediaHeadline,
          long: mediaHeadline,
        },
        versions: [
          {
            kind: 'programme',
            live: true,
            versionId: externalId,
          },
        ],
      },
    };

    return generatedBlock;
  };

  return [
    {
      type: 'aresMedia',
      model: {
        blocks: [generateVideoBlock()],
      },
    },
  ];
}
