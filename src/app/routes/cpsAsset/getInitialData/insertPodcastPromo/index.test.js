import pipe from 'ramda/src/pipe';
import groupBy from 'ramda/src/groupBy';
import path from 'ramda/src/path';
import transformer from '.';

const buildBlocks = (count, type = 'text') =>
  Array(count)
    .fill()
    .map(() => ({ type }));

const buildPageFixture = blocks => ({
  content: {
    model: {
      blocks,
    },
  },
});

const findPromoIndex = transformedData =>
  transformedData.content.model.blocks.findIndex(
    block => block.type === 'podcastPromo',
  );

const expectPodcastPromoIndex = pipe(
  buildPageFixture,
  transformer,
  findPromoIndex,
  expect,
);

describe('insertPodcastPromo', () => {
  it('adds a podcast promo block', () => {
    const input = buildPageFixture(buildBlocks(10));

    const { text: textBlocks, podcastPromo: promoBlocks } = groupBy(
      path(['type']),
      transformer(input).content.model.blocks,
    );

    expect(textBlocks.length).toBe(10);
    expect(promoBlocks.length).toBe(1);
  });

  it.each`
    scenario | inputBlocks                                          | expectedIndex
    ${1}     | ${buildBlocks(0)}                                    | ${-1}
    ${2}     | ${buildBlocks(7)}                                    | ${-1}
    ${3}     | ${buildBlocks(8)}                                    | ${7}
    ${4}     | ${buildBlocks(9)}                                    | ${7}
    ${5}     | ${buildBlocks(8, 'not-text')}                        | ${-1}
    ${6}     | ${buildBlocks(1, 'not-text').concat(buildBlocks(8))} | ${8}
  `(
    'scenario [$scenario]: places podcast promo at correct index',
    ({ inputBlocks, expectedIndex }) => {
      expectPodcastPromoIndex(inputBlocks).toBe(expectedIndex);
    },
  );
});
