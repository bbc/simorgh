import equals from 'ramda/src/equals';
import groupBy from 'ramda/src/groupBy';
import lensPath from 'ramda/src/lensPath';
import path from 'ramda/src/path';
import pipe from 'ramda/src/pipe';
import prop from 'ramda/src/prop';
import set from 'ramda/src/set';
import view from 'ramda/src/view';

const model = 'model';
const firstItem = [0];
const pathToBlocks = [model, 'blocks'];
const articleBlocksLens = lensPath(['content'].concat(pathToBlocks));
const oEmbedLens = lensPath(
  pathToBlocks.concat(firstItem, pathToBlocks, firstItem, [model, 'oembed']),
);
const isEmbed = pipe(prop('type'), equals('social')); // to include embeds other than social then change this line
const getOembed = view(oEmbedLens);
const getOembedProp = property => pipe(getOembed, prop(property));
const getEmbedUrl = getOembedProp('url');
const getEmbedProvider = getOembedProp('provider_name');
const groupEmbedsByProvider = groupBy(getEmbedProvider);
const matchesEmbedUrl = embedUrl => pipe(getEmbedUrl, equals(embedUrl));
const addIndexToEmbed = ([provider, blocks]) => [
  provider,
  blocks.map((block, index) => {
    const indexOfType = index + 1;
    const oEmbed = getOembed(block);

    return set(oEmbedLens, { ...oEmbed, indexOfType }, block);
  }),
];
const enrichEmbeds = indexedEmbeds => block => {
  if (isEmbed(block)) {
    const provider = getEmbedProvider(block); // e.g. Twitter, YouTube
    const embedUrl = getEmbedUrl(block);
    const [, embedsByProvider] = indexedEmbeds.find(
      pipe(path(firstItem), equals(provider)),
    );

    return embedsByProvider.find(matchesEmbedUrl(embedUrl));
  }

  return block;
};

export default json => {
  try {
    const articleBlocks = view(articleBlocksLens, json);
    const embeds = articleBlocks.filter(isEmbed);
    const embedsGroupedByProvider = groupEmbedsByProvider(embeds);
    const indexedEmbeds = Object.entries(embedsGroupedByProvider).map(
      addIndexToEmbed,
    );
    const enrichedArticleBlocks = articleBlocks.map(
      enrichEmbeds(indexedEmbeds),
    );

    return set(articleBlocksLens, enrichedArticleBlocks, json);
  } catch (error) {
    console.error(error);

    return json;
  }
};
