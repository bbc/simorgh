import pathOr from 'ramda/src/pathOr';
import clone from 'ramda/src/clone';

const makeIntroductionBold = jsonRaw => {
  const json = clone(jsonRaw);
  const blocks = pathOr([], ['content', 'blocks'], json);

  const introIndex = blocks.findIndex(
    block => block.type === 'paragraph' && block.role === 'introduction',
  );

  if (introIndex >= 0 && blocks[introIndex]) {
    blocks[introIndex].text = `<bold>${blocks[introIndex].text}</bold>`;
    blocks[introIndex].markupType = 'candy_xml';
  }

  return {
    ...json,
    content: {
      blocks,
    },
  };
};

export default makeIntroductionBold;
