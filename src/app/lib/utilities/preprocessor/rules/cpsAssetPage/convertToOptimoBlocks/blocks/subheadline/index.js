import convertParagraph from '../paragraph';

const convertToSubheadline = async block => {
  const innerParagraph = await convertParagraph(block);

  return {
    type: 'subheadline',
    model: {
      blocks: [innerParagraph],
    },
  };
};

export default convertToSubheadline;
