import mergeDeepLeft from 'ramda/src/mergeDeepLeft';
import path from 'ramda/src/path';
import pipe from 'ramda/src/pipe';
import prop from 'ramda/src/prop';
import equals from 'ramda/src/equals';
import lensPath from 'ramda/src/lensPath';
import set from 'ramda/src/set';
import view from 'ramda/src/view';

const getArticleBlocks = path(['content', 'model', 'blocks']);
const isSocialEmbedBlock = pipe(prop('type'), equals('social'));
const oEmbedLens = lensPath([
  'model',
  'blocks',
  0,
  'model',
  'blocks',
  0,
  'model',
  'oembed',
]);
const matchesProvider = pipe(
  view(oEmbedLens),
  prop('provider_name'),
  equals('Twitter'), // TODO needs to be for all providers, not just Twitter
);
const getEmbedUrl = pipe(view(oEmbedLens), prop('url'));
const matchesEmbedUrl = embedUrl => pipe(getEmbedUrl, equals(embedUrl));
const enrichSocialEmbedBlocks = indexedSocialEmbedBlocks => block => {
  if (isSocialEmbedBlock(block)) {
    const embedUrl = getEmbedUrl(block);

    return indexedSocialEmbedBlocks.find(matchesEmbedUrl(embedUrl));
  }

  return block;
};
const addIndexToSocialEmbedBlock = (block, index) => {
  const indexOfType = index + 1;
  const oEmbed = view(oEmbedLens, block);

  return set(oEmbedLens, { ...oEmbed, indexOfType }, block);
};

export default json => {
  const articleBlocks = getArticleBlocks(json);
  const socialEmbedBlocks = articleBlocks.filter(isSocialEmbedBlock);
  const socialEmbedsByProvider = socialEmbedBlocks.filter(matchesProvider);
  const indexedSocialEmbedBlocks = socialEmbedsByProvider.map(
    addIndexToSocialEmbedBlock,
  );
  const enrichedArticleBlocks = articleBlocks.map(
    enrichSocialEmbedBlocks(indexedSocialEmbedBlocks),
  );

  return mergeDeepLeft(
    {
      content: {
        model: {
          blocks: enrichedArticleBlocks,
        },
      },
    },
    json,
  );
};
