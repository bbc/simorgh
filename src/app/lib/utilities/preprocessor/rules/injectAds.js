import compose from 'ramda/src/compose';
import {
  getJsonContent,
  getBlocks,
  mergeJsonRawWithBlocks,
} from './addIdsToBlocks';

const adBlock = {
  model: {
    attributes: [],
    text: '',
  },
  type: 'ad',
};

const mapInjectAdsWithinText = blocks => {
  let paragraphCount = 0;
  let adCount = 0;

  return blocks.map(block => {
    if (block.type !== 'text') return block;

    const paragraphs = getBlocks(block);
    paragraphCount += paragraphs.length;

    if (paragraphCount > 5 && paragraphCount < 9 && adCount === 0) {
      adCount += 1;
      paragraphs.splice(4, 0, adBlock);
    }

    if (paragraphCount > 9 && adCount === 1) {
      adCount += 1;
      paragraphs.splice(8, 0, adBlock);
    }

    return {
      ...block,
      model: {
        ...block.model,
        blocks: paragraphs,
      },
    };
  });
};

export default jsonRaw => {
  const injectAdBlocks = compose(
    mergeJsonRawWithBlocks,
    mapInjectAdsWithinText,
    getBlocks,
    getJsonContent,
  )(jsonRaw);

  return injectAdBlocks(jsonRaw);
};
