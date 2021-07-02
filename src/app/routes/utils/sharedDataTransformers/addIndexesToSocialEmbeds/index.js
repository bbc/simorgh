import mergeDeepLeft from 'ramda/src/mergeDeepLeft';
import path from 'ramda/src/path';
import pipe from 'ramda/src/pipe';
import prop from 'ramda/src/prop';
import equals from 'ramda/src/equals';
import lensPath from 'ramda/src/lensPath';
import set from 'ramda/src/set';
import view from 'ramda/src/view';
import groupBy from 'ramda/src/groupBy';

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
const getSocialEmbedsByProviders = groupBy(
  pipe(view(oEmbedLens), prop('provider_name')),
);
const getEmbedUrl = pipe(view(oEmbedLens), prop('url'));
const getProvider = pipe(view(oEmbedLens), prop('provider_name'));
const matchesEmbedUrl = embedUrl => pipe(getEmbedUrl, equals(embedUrl));
const addIndexToSocialEmbedBlock = ([provider, blocks]) => [
  provider,
  blocks.map((block, index) => {
    const indexOfType = index + 1;
    const oEmbed = view(oEmbedLens, block);

    return set(oEmbedLens, { ...oEmbed, indexOfType }, block);
  }),
];
const enrichSocialEmbedBlocks = indexedSocialEmbedBlocks => block => {
  if (isSocialEmbedBlock(block)) {
    const provider = getProvider(block); // e.g. Twitter, YouTube
    const embedUrl = getEmbedUrl(block);
    const [, providerBlocks] = indexedSocialEmbedBlocks.find(
      pipe(path([0]), equals(provider)),
    );

    return providerBlocks.find(matchesEmbedUrl(embedUrl));
  }

  return block;
};

export default json => {
  try {
    const articleBlocks = getArticleBlocks(json);
    const socialEmbedBlocks = articleBlocks.filter(isSocialEmbedBlock);
    const socialEmbedsByProviders = getSocialEmbedsByProviders(
      socialEmbedBlocks,
    );
    const indexedSocialEmbedBlocks = Object.entries(
      socialEmbedsByProviders,
    ).map(addIndexToSocialEmbedBlock);
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
  } catch (error) {
    console.error('Error transforming data in addIndexToSocialEmbeds', error);

    return json;
  }
};
