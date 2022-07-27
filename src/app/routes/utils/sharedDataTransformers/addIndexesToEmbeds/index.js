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
const socialLens = lensPath([model]);
const getOembed = view(oEmbedLens);
const getOembedProp = property => pipe(getOembed, prop(property));

const getSocial = view(socialLens);
const getSocialProp = property => pipe(getSocial, prop(property));

const getEmbedUrl = getOembedProp('url');
const getEmbedProvider = getOembedProp('provider_name');
const getEmbedIndexOfType = getOembedProp('indexOfType');
const getSource = getSocialProp('source');
const matchesEmbedProvider = provider =>
  pipe(getEmbedProvider, equals(provider));
const enrichBlocks = (accumulator, block, index, blocks) => {
  const embedUrl = getEmbedUrl(block);
  const embedProvider = getEmbedProvider(block);
  const source = getSource(block);

  if ((embedUrl || source) && embedProvider) {
    const accumulatedBlocksByProvider = accumulator.filter(
      matchesEmbedProvider(embedProvider),
    );
    const allBlocksByProvider = blocks.filter(
      matchesEmbedProvider(embedProvider),
    );
    const numOfAllBlocksByProvider = allBlocksByProvider.length;
    const isOnlyEmbedOfType = numOfAllBlocksByProvider === 1;

    if (isOnlyEmbedOfType) {
      return accumulator.concat(block);
    }
    const numOfAccumulatedBlocksByProvider = accumulatedBlocksByProvider.length;
    const lastBlockByProvider =
      accumulatedBlocksByProvider[numOfAccumulatedBlocksByProvider - 1];
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
    const newArticleBlocks = getArticleBlocks(json).reduce(enrichBlocks, []);

    return set(articleBlocksLens, newArticleBlocks, json);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    return json;
  }
};
