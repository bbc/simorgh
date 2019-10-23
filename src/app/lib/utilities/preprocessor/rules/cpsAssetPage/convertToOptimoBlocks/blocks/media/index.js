import pick from 'ramda/src/pick';

const generateVideoBlock = block => {
  const generatedBlock = {
    type: 'aresMediaMetadata',
    blockId: `urn:bbc:ares::${block.subType}:${block.id}`,
    model: pick(
      [
        'advertising',
        'embedding',
        'format',
        'id',
        'imageCopyright',
        'imageUrl',
        'subType',
        'synopses',
        'title',
        'versions',
      ],
      block,
    ),
  };

  if (generatedBlock.model.format === 'video') {
    generatedBlock.model.format = 'audio_video';
  }

  return generatedBlock;
};

const generateImageBlock = block => {
  return {
    type: 'image',
    model: {
      blocks: [
        {
          type: 'rawImage',
          model: {
            copyrightHolder: block.imageCopyright,
            locator: block.imageUrl,
          },
        },
      ],
    },
  };
};

const convertMedia = block => {
  return {
    type: 'video',
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
};

export default convertMedia;
