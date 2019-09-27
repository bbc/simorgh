import { clone, pathOr } from 'ramda';
import image from './generators/image';

const handleMissingType = block => {
  console.log(`Missing type field on block ${block.type}`);
  return null;
};

const parseByType = {
  image,
};

const parseBlockByMarkupType = block => {
  const { type } = block;

  const parsedBlock = (parseByType[type] || handleMissingType)(block);

  return parsedBlock;
};

const convertCpsBlocksToOptimoBlocks = jsonRaw => {
  const json = clone(jsonRaw);
  const blocks = pathOr([], ['content', 'blocks'], json);

  const parsedBlocks = blocks
    .map(block => {
      return parseBlockByMarkupType(block);
    })
    .filter(Boolean);

  return {
    ...json,
    content: {
      model: {
        blocks: parsedBlocks,
      },
    },
  };
};

export default convertCpsBlocksToOptimoBlocks;
