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
      return null;
    }
    const { type } = block;

    const parsedBlock = await (typesToConvert[type] || handleMissingType)(
      block,
    );

    // eslint-disable-next-line no-console
    console.log(parsedBlock); // Once resolved outputs: `{ type: 'text', model: { blocks: [ [Object] ] } }`

    return parsedBlock;
  };

  const json = clone(jsonRaw);
  const blocks = pathOr([], ['content', 'blocks'], json);

  const parsedBlocks = await blocks.map(await parseBlockByType).filter(Boolean);
  // eslint-disable-next-line no-console
  console.log(parsedBlocks); // Outputs : [ Promise { undefined }, Promise { <pending> } ...]

  return {
    ...json,
    content: {
      model: {
        blocks: parsedBlocks,
      },
    },
  };
};

export default convertToOptimoBlocks;
