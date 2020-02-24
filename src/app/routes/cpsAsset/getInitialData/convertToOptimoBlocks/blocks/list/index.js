import convertParagraph from '../paragraph';
import { orderedListType, unorderedListType } from '#app/models/blocks';

const convertToList = async block => {
  const type = block.numbered ? orderedListType : unorderedListType;

  const listItemBlocks = await Promise.all(
    block.items.map(async item => {
      const paragraph = await convertParagraph(item);
      paragraph.type = 'listItem';
      return paragraph;
    }),
  );

  return {
    model: {
      blocks: [
        {
          model: {
            blocks: listItemBlocks,
          },
          type,
        },
      ],
    },
    type: 'text',
  };
};

export default convertToList;
