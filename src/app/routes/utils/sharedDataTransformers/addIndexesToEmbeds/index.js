import equals from 'ramda/src/equals';
import lensPath from 'ramda/src/lensPath';
import pipe from 'ramda/src/pipe';
import prop from 'ramda/src/prop';
import set from 'ramda/src/set';
import view from 'ramda/src/view';

const model = 'model';
const firstItem = [0];
const pathToBlocks = [model, 'blocks'];
const articleBlocksLens = lensPath(['content'].concat(pathToBlocks));
const getArticleBlocks = view(articleBlocksLens);
const oEmbedLens = lensPath(
  pathToBlocks.concat(firstItem, pathToBlocks, firstItem, [model, 'oembed']),
);
const getOembed = view(oEmbedLens);
const getOembedProp = property => pipe(getOembed, prop(property));
const getEmbedUrl = getOembedProp('url');
const getEmbedProvider = getOembedProp('provider_name');
const getEmbedIndexOfType = getOembedProp('indexOfType');
const matchesEmbedProvider = provider =>
  pipe(getEmbedProvider, equals(provider));
const accumulatedBlocksByProvider = (accumulator, block, index, blocks) => {
  const embedUrl = getEmbedUrl(block);
  const embedProvider = getEmbedProvider(block);

  if (embedUrl && embedProvider) {
    const blocksByProvider = accumulator.filter(
      matchesEmbedProvider(embedProvider),
    );
    const blocksByProviderOfAllBlocks = blocks.filter(
      matchesEmbedProvider(embedProvider),
    );
    const numBlocksByProvider = blocksByProvider.length;
    const numBlocksByProviderOfAllBlocks = blocksByProviderOfAllBlocks.length;
    const lastBlockByProvider = blocksByProvider[numBlocksByProvider - 1];
    const isOnlyEmbedOfType = numBlocksByProviderOfAllBlocks === 1;

    if (isOnlyEmbedOfType) {
      return accumulator.concat(block);
    }

    const indexOfType = getEmbedIndexOfType(lastBlockByProvider) + 1 || 0;
    const oEmbed = getOembed(block);
    const updatedOembed = {
      ...oEmbed,
      indexOfType,
    };
    const updatedBlock = set(oEmbedLens, updatedOembed, block);

    return accumulator.concat(updatedBlock);
  }

  return accumulator.concat(block);
};

export default json => {
  try {
    const newArticleBlocks = getArticleBlocks(json).reduce(
      accumulatedBlocksByProvider,
      [],
    );

    return set(articleBlocksLens, newArticleBlocks, json);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    return json;
  }
};
