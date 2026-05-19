// biome-ignore-all lint/suspicious/noExplicitAny: we want this
import type { OptimoBlock } from '#app/models/types/optimo';
import type { Post } from '#nextjs/pages/[service]/live/[id]/Post/types';
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
  pathToBlocks.concat(
    firstItem as any as string[],
    pathToBlocks,
    firstItem as any as string[],
    [model, 'oembed'],
  ),
);

const socialLens = lensPath([model]);

const getOembed = view(oEmbedLens);

const getOembedProp = (property: any): any => pipe(getOembed, prop(property));

const getSocial = view(socialLens);

const getSocialProp = (property: any): any => pipe(getSocial, prop(property));

const getEmbedUrl = getOembedProp('url');

const getEmbedProvider = getOembedProp('provider_name');

const getEmbedIndexOfType = getOembedProp('indexOfType');

const getSource = getSocialProp('source');

const matchesEmbedProvider = (provider: any) =>
  pipe(getEmbedProvider, equals(provider));

type EnrichBlocksProps = (
  accumulator: OptimoBlock[],
  block: OptimoBlock,
  index: number,
  blocks: OptimoBlock[],
) => OptimoBlock[];

const enrichBlocks: EnrichBlocksProps = (
  accumulator,
  block,
  _index,
  blocks,
) => {
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

export default (json: Post): Post => {
  try {
    const newArticleBlocks = getArticleBlocks(json).reduce(enrichBlocks, []);
    return set(articleBlocksLens, newArticleBlocks, json);
  } catch (_error) {
    return json;
  }
};
