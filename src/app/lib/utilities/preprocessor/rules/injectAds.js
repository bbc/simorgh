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

  return blocks.reduce((accBlocks, currentBlock) => {
    const withoutAd = [...accBlocks, currentBlock];

    if (currentBlock.type !== 'text') {
      return withoutAd;
    }

    const paragraphs = getBlocks(currentBlock);
    paragraphCount += paragraphs.length;

    const withAd = () => {
      adCount += 1;
      return [...accBlocks, currentBlock, adBlock];
    };

    if (paragraphCount > 5 && adCount === 0) {
      return withAd();
    }

    if (paragraphCount > 9 && adCount === 1) {
      return withAd();
    }

    return withoutAd;
  }, []);
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
