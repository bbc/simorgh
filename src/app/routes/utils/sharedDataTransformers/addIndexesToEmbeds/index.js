import equals from 'ramda/src/equals';
import filter from 'ramda/src/filter';
import find from 'ramda/src/find';
import groupBy from 'ramda/src/groupBy';
import lensPath from 'ramda/src/lensPath';
import path from 'ramda/src/path';
import pipe from 'ramda/src/pipe';
import prop from 'ramda/src/prop';
import set from 'ramda/src/set';
import view from 'ramda/src/view';
import when from 'ramda/src/when';

const model = 'model';
const firstItem = [0];
const pathToBlocks = [model, 'blocks'];
const articleBlocksLens = lensPath(['content'].concat(pathToBlocks));
const getArticleBlocks = view(articleBlocksLens);
const oEmbedLens = lensPath(
  pathToBlocks.concat(firstItem, pathToBlocks, firstItem, [model, 'oembed']),
);
const isEmbed = pipe(prop('type'), equals('social')); // to include embeds other than social then change this line
const getOembed = view(oEmbedLens);
const getOembedProp = property => pipe(getOembed, prop(property));
const getEmbedUrl = getOembedProp('url');
const getEmbedProvider = getOembedProp('provider_name');
const groupEmbedsByProvider = pipe(
  getArticleBlocks,
  filter(isEmbed),
  groupBy(getEmbedProvider),
  Object.entries,
);
const matchesEmbedUrl = embedUrl => pipe(getEmbedUrl, equals(embedUrl));
const addIndexToEmbed = ([provider, blocks]) => [
  provider,
  blocks.map((block, index) => {
    const indexOfType = index + 1;
    const oEmbed = getOembed(block);

    return set(oEmbedLens, { ...oEmbed, indexOfType }, block);
  }),
];

const enrichEmbed = indexedEmbeds => unIndexedEmbed => {
  const provider = getEmbedProvider(unIndexedEmbed); // e.g. Twitter, YouTube
  const url = getEmbedUrl(unIndexedEmbed);
  const findEmbedsByProvider = find(pipe(path(firstItem), equals(provider)));
  const findEmbedsByUrl = find(matchesEmbedUrl(url));
  const getMatchingEmbed = pipe(
    findEmbedsByProvider,
    pipe(path([1]), findEmbedsByUrl),
  );

  return getMatchingEmbed(indexedEmbeds);
};

export default json => {
  try {
    const embedsGroupedByProvider = groupEmbedsByProvider(json);
    const indexedEmbeds = embedsGroupedByProvider.map(addIndexToEmbed);
    const enrichedArticleBlocks = getArticleBlocks(json).map(
      when(isEmbed, enrichEmbed(indexedEmbeds)),
    );

    return set(articleBlocksLens, enrichedArticleBlocks, json);
  } catch (error) {
    console.error(error);

    return json;
  }
};
