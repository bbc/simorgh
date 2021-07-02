import path from 'ramda/src/path';
import addIndexToSocialEmbed from '.';
import fixtureData from './fixtureData.json';

const getBlockOfIndex = index =>
  path([
    'content',
    'model',
    'blocks',
    index,
    'model',
    'blocks',
    0,
    'model',
    'blocks',
    0,
    'model',
    'oembed',
    'indexOfType',
  ]);

it('should return enriched blocks with the first social block with "indexOfType" equal to 1', () => {
  const enrichedArticleBlocks = addIndexToSocialEmbed(fixtureData);
  const firstSocialBlock = enrichedArticleBlocks.content.model.blocks.find(
    ({ type }) => type === 'social',
  );

  expect(
    path(
      [
        'model',
        'blocks',
        0,
        'model',
        'blocks',
        0,
        'model',
        'oembed',
        'indexOfType',
      ],
      firstSocialBlock,
    ),
  ).toEqual(1);
});

it('should return enriched blocks with a new property "indexOfType" equal to n + 1 added to all social blocks', () => {
  const enrichedArticleBlocks = addIndexToSocialEmbed(fixtureData);

  expect(getBlockOfIndex(2)(enrichedArticleBlocks)).toEqual(1);

  expect(getBlockOfIndex(4)(enrichedArticleBlocks)).toEqual(2);

  expect(getBlockOfIndex(6)(enrichedArticleBlocks)).toEqual(3);
});
