import pathOr from 'ramda/src/pathOr';
import { blockContainingText } from '#app/models/blocks';

const addHeadingToSTY = jsonRaw => {
  const headlineText = pathOr(
    null,
    ['promo', 'headlines', 'headline'],
    jsonRaw,
  );

  if (!headlineText) {
    return jsonRaw;
  }

  const newBlock = blockContainingText('headline', headlineText);

  return {
    ...jsonRaw,
    content: {
      model: {
        blocks: [
          newBlock,
          ...pathOr([], ['content', 'model', 'blocks'], jsonRaw),
        ],
      },
    },
  };
};

export default addHeadingToSTY;
