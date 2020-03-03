import convertParagraph from '../paragraph';
import { blockBase } from '#app/models/blocks';

const convertToSubheadline = async block => {
  const typesArray = ['crosshead', 'heading', 'subheading'];
  if (typesArray.includes(block.type)) {
    const innerParagraph = await convertParagraph(block);
    return blockBase('subheadline', {
      blocks: [innerParagraph],
    });
  }
  return null;
};

export default convertToSubheadline;
