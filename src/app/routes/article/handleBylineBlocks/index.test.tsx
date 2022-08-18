/* eslint-disable no-template-curly-in-string */
import path from 'ramda/src/path';
import handleBylineBlocks from '.';

const createFixture = (fixtureBlock: any) => {
  return {
    content: {
      model: {
        blocks: fixtureBlock,
      },
    },
  };
};

const bylineBlock = { type: 'byline' };
const headlineBlock = { type: 'headline' };
const randomBlock = { type: 'block' };

describe('Byline Positioning', () => {
  it.each`
    description                                                                                              | testBlock                                                                  | expected
    ${'keep the same byline position when byline is after the headline'}                                     | ${createFixture([headlineBlock, bylineBlock, randomBlock])}                | ${createFixture([headlineBlock, bylineBlock, randomBlock])}
    ${'position byline after the first headline when byline is present and is not after the first headline'} | ${createFixture([headlineBlock, randomBlock, bylineBlock])}                | ${createFixture([headlineBlock, bylineBlock, randomBlock])}
    ${'position byline before any other block when headline is not present'}                                 | ${createFixture([randomBlock, bylineBlock, randomBlock])}                  | ${createFixture([bylineBlock, randomBlock, randomBlock])}
    ${'position byline after the first headline when there is multiple headlines in the page'}               | ${createFixture([headlineBlock, headlineBlock, bylineBlock, randomBlock])} | ${createFixture([headlineBlock, bylineBlock, headlineBlock, randomBlock])}
  `('should $description', ({ testBlock, expected }) => {
    expect(handleBylineBlocks(testBlock)).toEqual(expected);
  });
});

describe('Extra Byline delation', () => {
  it.each`
    description                                                  | testBlock
    ${'not change data when only one byline is present '}        | ${createFixture([headlineBlock, bylineBlock, randomBlock])}
    ${'delete all extra byline when there are multiple bylines'} | ${createFixture([headlineBlock, randomBlock, bylineBlock, bylineBlock, bylineBlock])}
  `('should $description', ({ testBlock }) => {
    const transformedByline = handleBylineBlocks(testBlock);
    const blocks = path(
      ['content', 'model', 'blocks'],
      transformedByline,
    ) as any;
    const bylineBlocks = blocks.filter((block: any) => block.type === 'byline');
    expect(bylineBlocks.length).toBe(1);
  });
});
