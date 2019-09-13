import pathOr from 'ramda/src/pathOr';
import path from 'ramda/src/path';

const addHeadingToSTY = jsonRaw => {
  const headlineText = pathOr(
    null,
    ['promo', 'headlines', 'headline'],
    jsonRaw,
  );

  if (!headlineText) {
    return jsonRaw;
  }

  const newBlock = {
    text: headlineText,
    markupType: 'plain_text',
    type: 'heading',
  };

  return {
    ...jsonRaw,
    content: {
      ...path(['content'], jsonRaw),
      blocks: [newBlock, ...path(['content', 'blocks'], jsonRaw)],
    },
  };
};

export default addHeadingToSTY;
