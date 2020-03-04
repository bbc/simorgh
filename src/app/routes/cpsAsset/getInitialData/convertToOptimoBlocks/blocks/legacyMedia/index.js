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

const convertMedia = block => {
  const convertedBlock = {
    type: 'legacyMedia',
    model: {
      locator: `urn:bbc:pips:pid:${block.id}`,
      blocks: [
        {
          type: 'aresMedia',
          model: {
            blocks: [generateVideoBlock(block)],
          },
        },
      ],
    },
  };
  return convertedBlock;
};

export default convertMedia;
