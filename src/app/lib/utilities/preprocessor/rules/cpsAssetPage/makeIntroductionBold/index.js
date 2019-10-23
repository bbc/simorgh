import pathOr from 'ramda/src/pathOr';
import clone from 'ramda/src/clone';

const makeIntroductionBold = jsonRaw => {
  const json = clone(jsonRaw);
  const blocks = pathOr([], ['content', 'blocks'], json);
  let introIndex;

  for (let x = 0; x < blocks.length; x += 1) {
    const block = blocks[x];

    if (block.type === 'paragraph' && block.role === 'introduction') {
      introIndex = x;
      break;
    }
  }

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
