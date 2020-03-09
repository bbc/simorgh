const generateVideoBlock = (block, json) => {
  console.log(`block: ${JSON.stringify(block)}`);
  console.log(`json: ${JSON.stringify(json)}`);
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

const convertMedia = (block, json) => {
  const convertedBlock = {
    type: 'legacyMedia',
    model: {
      locator: `urn:bbc:pips:pid:${block.id}`,
      blocks: [
        {
          type: 'aresMedia',
          model: {
            blocks: [generateVideoBlock(block, json)],
          },
        },
      ],
    },
  };
  return convertedBlock;
};

export default convertMedia;
