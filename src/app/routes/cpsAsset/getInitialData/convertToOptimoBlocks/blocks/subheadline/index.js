import nodeLogger from '#lib/logger.node';
import { blockBase } from '#app/models/blocks';
import convertParagraph from '../paragraph';

const logger = nodeLogger(__filename);

const convertToSubheadline = async block => {
  const typesArray = ['crosshead', 'heading', 'subheading'];
  if (typesArray.includes(block.type)) {
    const innerParagraph = await convertParagraph(block);
    return blockBase('subheadline', {
      blocks: [innerParagraph],
    });
  }
  logger.error(`Incorrect block type ${block.type}`);
  return null;
};

export default convertToSubheadline;
