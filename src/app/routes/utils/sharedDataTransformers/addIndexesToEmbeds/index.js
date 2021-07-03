import path from 'ramda/src/path';
import pipe from 'ramda/src/pipe';
import prop from 'ramda/src/prop';
import equals from 'ramda/src/equals';
import lensPath from 'ramda/src/lensPath';
import set from 'ramda/src/set';
import view from 'ramda/src/view';
import groupBy from 'ramda/src/groupBy';

const model = 'model';
const firstItem = [0];
const blockPath = [model, 'blocks'];
const articleBlocksLens = lensPath(['content'].concat(blockPath));
const oEmbedLens = lensPath(
  blockPath.concat(firstItem, blockPath, firstItem, [model, 'oembed']),
);
const isEmbedBlock = pipe(prop('type'), equals('social'));
const getOembed = view(oEmbedLens);
const getOembedProp = property => pipe(getOembed, prop(property));
const getEmbedUrl = getOembedProp('url');
const getEmbedProvider = getOembedProp('provider_name');
const getEmbedsByProviders = groupBy(getEmbedProvider);
const matchesEmbedUrl = embedUrl => pipe(getEmbedUrl, equals(embedUrl));
const addIndexToEmbedBlock = ([provider, blocks]) => [
  provider,
  blocks.map((block, index) => {
    const indexOfType = index + 1;
    const oEmbed = getOembed(block);

    return set(oEmbedLens, { ...oEmbed, indexOfType }, block);
  }),
];
const enrichEmbedBlocks = indexedEmbedBlocks => block => {
  if (isEmbedBlock(block)) {
    const provider = getEmbedProvider(block); // e.g. Twitter, YouTube
    const embedUrl = getEmbedUrl(block);
    const [, blocksByProvider] = indexedEmbedBlocks.find(
      pipe(path(firstItem), equals(provider)),
    );

    return blocksByProvider.find(matchesEmbedUrl(embedUrl));
  }

  return block;
};

export default json => {
  try {
    const articleBlocks = view(articleBlocksLens, json);
    const embedBlocks = articleBlocks.filter(isEmbedBlock);
    const embedsByProviders = getEmbedsByProviders(embedBlocks);
    const indexedEmbedBlocks = Object.entries(embedsByProviders).map(
      addIndexToEmbedBlock,
    );
    const enrichedArticleBlocks = articleBlocks.map(
      enrichEmbedBlocks(indexedEmbedBlocks),
    );

    return set(articleBlocksLens, enrichedArticleBlocks, json);
  } catch (error) {
    console.error(error);

    return json;
  }
};
