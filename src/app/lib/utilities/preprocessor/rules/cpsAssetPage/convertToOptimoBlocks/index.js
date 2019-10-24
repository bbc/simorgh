import { clone, pathOr, path } from 'ramda';
import paragraph from './blocks/paragraph';
import { escapeDoubleQuotes } from './utils/helpers';
import media from './blocks/media';

const handleMissingType = block =>
  console.log(`Missing type field on block ${block.type}`); // eslint-disable-line no-console

const typesToConvert = {
  paragraph,
  media,
};

const parseBlockByType = block => {
  if (!path(['type'], block)) return false;

  const { type } = block;

  let cleanBlock = block;

  // if the block has text handle escaped quotes
  if (path(['text'], cleanBlock)) {
    cleanBlock = {
      ...cleanBlock,
      text: escapeDoubleQuotes(cleanBlock.text),
    };
  }

  const parsedBlock = (typesToConvert[type] || handleMissingType)(cleanBlock);

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
