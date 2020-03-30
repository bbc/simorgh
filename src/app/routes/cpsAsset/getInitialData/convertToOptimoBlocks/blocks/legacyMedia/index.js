const generateVideoBlock = block => {
  const generatedBlock = {
    type: 'aresMediaMetadata',
    blockId: `urn:bbc:ares::${block.subType}:${block.id}`,
    model: {
      available: true,
      blockId: block.id,
      format: 'audio_video',
    },
  };

  return generatedBlock;
};

const generateImageBlock = () => {
  return {
    type: 'image',
    model: {
      blocks: [
        {
          type: 'rawImage',
          model: {
            copyrightHolder: '',
            locator: `${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH}images/media_placeholder.png`,
            originCode: 'pips',
          },
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
            blocks: [generateVideoBlock(block), generateImageBlock()],
          },
        },
      ],
    },
  };
  return convertedBlock;
};

export default convertMedia;
