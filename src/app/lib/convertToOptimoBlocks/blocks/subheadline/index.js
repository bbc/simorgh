import convertParagraph from '../paragraph';
import { blockBase } from '#app/models/blocks';

const convertToSubheadline = async block => {
  const innerParagraph = await convertParagraph(block);
  return blockBase('subheadline', {
    blocks: [innerParagraph],
  });
};

export default convertToSubheadline;
