import convertParagraph from '../paragraph';

const convertToList = async block => {
  const type = block.numbered ? 'orderedList' : 'unorderedList';

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
