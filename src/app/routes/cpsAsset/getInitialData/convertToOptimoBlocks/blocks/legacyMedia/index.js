import is from 'ramda/src/is';

const generateVideoBlock = block => {
  const generatedBlock = {
    type: 'aresMediaMetadata',
    blockId: `urn:bbc:ares::${block.subType}:${block.id}`,
    model: {
      available: true,
      blockId: block.id,
    },
  };

  if (generatedBlock.model.format === 'video') {
    generatedBlock.model.format = 'audio_video';
  }

  return generatedBlock;
};

const generateImageBlock = block => {
  if (!is(String, block.imageUrl)) return {};

  return {
    type: 'image',
    model: {
      blocks: [
        {
          type: 'rawImage',
          model: {},
        },
      ],
    },
  };
};

const convertMedia = block => {
  const convertedBlock = {
    type: 'legacyMedia',
    model: {
      locator: `urn:bbc:pips:pid:${block.id}`,
      blocks: [
        {
          type: 'aresMedia',
          model: {
            blocks: [generateVideoBlock(block), generateImageBlock(block)],
          },
        },
      ],
    },
  };
  return convertedBlock;
};

export default convertMedia;
