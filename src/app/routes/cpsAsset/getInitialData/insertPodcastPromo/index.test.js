import pipe from 'ramda/src/pipe';
import groupBy from 'ramda/src/groupBy';
import path from 'ramda/src/path';
import pathEq from 'ramda/src/pathEq';
import transformer from '.';

const buildBlocks = (...blocks) => blocks.map(type => ({ type }));

const buildPageFixture = blocks => ({
  content: {
    blocks,
  },
});

const [H, P, L] = ['heading', 'paragraph', 'list'];

describe('insertPodcastPromo', () => {
  it('adds a podcast promo block', () => {
    const input = buildPageFixture(buildBlocks(P, P, P, P, P, P, P, P));

    const { paragraph: paragraphBlocks, podcastPromo: promoBlocks } = groupBy(
      path(['type']),
      transformer(input).content.blocks,
    );

    expect(paragraphBlocks.length).toBe(8);
    expect(promoBlocks.length).toBe(1);
  });

  it.each`
    scenario | inputBlocks                                     | expectedIndex
    ${1}     | ${buildBlocks()}                                | ${-1}
    ${2}     | ${buildBlocks(P, P, P, P, P, P)}                | ${-1}
    ${3}     | ${buildBlocks(P, P, P, P, P, P, P)}             | ${-1}
    ${4}     | ${buildBlocks(P, P, P, P, P, P, P, H)}          | ${-1}
    ${5}     | ${buildBlocks(P, P, P, P, P, P, P, P)}          | ${6}
    ${6}     | ${buildBlocks(H, P, P, P, P, P, P, P, P)}       | ${7}
    ${7}     | ${buildBlocks(P, P, P, P, P, P, P, P, L)}       | ${-1}
    ${8}     | ${buildBlocks(P, P, P, P, P, P, P, P, L, P)}    | ${-1}
    ${9}     | ${buildBlocks(P, P, P, P, P, P, P, P, L, P, P)} | ${9}
  `(
    '[scenario $scenario]: places podcast promo at correct index',
    ({ inputBlocks, expectedIndex }) => {
      const findPromoIndex = transformedData =>
        transformedData.content.blocks.findIndex(
          block => block.type === 'podcastPromo',
        );

      pipe(
        buildPageFixture,
        transformer,
        findPromoIndex,
        expect,
      )(inputBlocks).toBe(expectedIndex);
    },
  );

  it.each`
    scenario | inputBlocks                                        | expectedIndex
    ${1}     | ${buildBlocks(P, P, P, P, P, P, P, P, H)}          | ${9}
    ${2}     | ${buildBlocks(P, P, P, P, P, P, P, P, P, H)}       | ${10}
    ${3}     | ${buildBlocks(H, P, P, P, P, P, P, P, P)}          | ${-1}
    ${4}     | ${buildBlocks(P, P, P, P, P, P, P, P, L, P, P)}    | ${-1}
    ${5}     | ${buildBlocks(P, P, P, P, P, P, P, P, L, P, P, H)} | ${12}
  `(
    '[scenario $scenario]: updates simorghMetadata for subsequent block',
    ({ inputBlocks, expectedIndex }) => {
      const findClearedIndex = transformedData =>
        transformedData.content.blocks.findIndex(
          pathEq(['simorghMetadata', 'clear'], true),
        );

      pipe(
        buildPageFixture,
        transformer,
        findClearedIndex,
        expect,
      )(inputBlocks).toBe(expectedIndex);
    },
  );
});
