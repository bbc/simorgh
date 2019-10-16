import { clone, pathOr } from 'ramda';
import convertParagraph from './convertParagraph';

const handleMissingType = block =>
  console.log(`Missing type field on block ${block.type}`); // eslint-disable-line no-console

const typesToConvert = {
  paragraph: convertParagraph,
};

const parseBlockByType = block => {
  if (!block || !block.type) {
    return null;
  }
  const { type } = block;

  const parsedBlock = (typesToConvert[type] || handleMissingType)(block);

  if (!parsedBlock) {
    return null;
  }

  return parsedBlock;
};

const convertToOptimoBlocks = async jsonRaw => {
  const json = clone(jsonRaw);
  const blocks = pathOr([], ['content', 'blocks'], json);

  const parsedBlocks = await Promise.all(blocks.map(parseBlockByType));

  return {
    ...json,
    content: {
      model: {
        blocks: parsedBlocks.filter(Boolean),
      },
    },
  };
};

export default convertToOptimoBlocks;
