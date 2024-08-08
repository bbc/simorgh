import isNil from 'ramda/src/isNil';
import { OptimoBlock } from '#app/models/types/optimo';
import { AtomicVersionProps } from '../types';

export default function convertAtomicVersionBlock(
  props: AtomicVersionProps,
  headline?: string,
) {
  const generateVideoBlock = () => {
    const {
      blocks,
      externalId,
      id,
      subType,
      format,
      available,
      live,
      embedding,
    } = props;

    const imageBlocks = blocks.find(
      (block: OptimoBlock) => block.type === 'image',
    )?.model?.blocks;

    const imageBlock = imageBlocks?.find(
      (block: OptimoBlock) => block.type === 'rawImage',
    )?.model;

    const mediaHeadline = headline;

    const generatedBlock = {
      type: 'aresMediaMetadata',
      blockId: `urn:bbc:ares::${subType}:${id}`,
      model: {
        live,
        embedding,
        subType,
        id,
        // If available is undefined, the video is available
        available: isNil(available) ? true : available,
        format: format === 'video' ? 'audio_video' : format,
        title: mediaHeadline,
        imageCopyright: imageBlock?.copyrightHolder,
        imageUrl: imageBlock?.href,
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
