import path from 'ramda/src/path';
import deepClone from 'ramda/src/clone';

const convertCpsBlocksToOptimoBlocks = jsonRaw => {
  const json = deepClone(jsonRaw);

  const blocks = path(['content', 'blocks'], json);

  const supportedBlocks = {
    blockyBlock: () => 'i am block',
  };

  const newBlocks = blocks
    .map(block => supportedBlocks[path(['type'], block)] || null)
    .filter(Boolean);

  return {
    ...jsonRaw,
    content: {
      model: {
        blocks: newBlocks,
      },
    },
  };
};

export default convertCpsBlocksToOptimoBlocks;
