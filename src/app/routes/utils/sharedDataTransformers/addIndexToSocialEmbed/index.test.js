import path from 'ramda/src/path';
import addIndexToSocialEmbed from '.';
import fixtureData from './fixtureData.json';

const getArticleBlocks = path(['content', 'model', 'blocks']);
const getIndexOfSocialEmbed = path([
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
  const enrichedArticleBlocks = getArticleBlocks(
    addIndexToSocialEmbed(fixtureData),
  );
  const firstSocialEmbed = enrichedArticleBlocks[2];

  expect(getIndexOfSocialEmbed(firstSocialEmbed)).toEqual(1);
});

it('should return enriched blocks with a new property "indexOfType" equal to n + 1 added to all social blocks', () => {
  const enrichedArticleBlocks = getArticleBlocks(
    addIndexToSocialEmbed(fixtureData),
  );
  const firstSocialEmbed = enrichedArticleBlocks[2];
  const secondSocialEmbed = enrichedArticleBlocks[4];
  const thirdSocialEmbed = enrichedArticleBlocks[6];

  expect(getIndexOfSocialEmbed(firstSocialEmbed)).toEqual(1);
  expect(getIndexOfSocialEmbed(secondSocialEmbed)).toEqual(2);
  expect(getIndexOfSocialEmbed(thirdSocialEmbed)).toEqual(3);
});
