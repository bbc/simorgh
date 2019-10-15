import { clone, pathOr } from 'ramda';
import convertParagraph from './convertParagraph';

const convertToOptimoBlocks = async jsonRaw => {
  const handleMissingType = block =>
    console.log(`Missing type field on block ${block.type}`); // eslint-disable-line no-console

  const typesToConvert = {
    paragraph: convertParagraph,
  };

  const parseBlockByType = async block => {
    if (!block || !block.type) {
      return false;
    }
    const { type } = block;

    const parsedBlock = (typesToConvert[type] || handleMissingType)(block);

    if (!parsedBlock) {
      return false;
    }

    return parsedBlock;
  };

  const json = clone(jsonRaw);
  const blocks = pathOr([], ['content', 'blocks'], json);

  const parsedBlocks = blocks.map(parseBlockByType);

  return {
    ...json,
    content: {
      model: {
        blocks: await Promise.all(parsedBlocks),
      },
    },
  };
};

export default convertToOptimoBlocks;
