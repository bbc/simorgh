import pipe from 'ramda/src/pipe';
import groupBy from 'ramda/src/groupBy';
import path from 'ramda/src/path';
import pathEq from 'ramda/src/pathEq';
import transformer from '.';

const buildPageFixture = blocks => ({
  content: {
    blocks,
  },
});

// Block Generators
const H = { type: 'heading' };
const P = (characterCount = 0) => ({
  type: 'paragraph',
  text: 'a'.repeat(characterCount),
});
const XMLP = (characterCount = 0) => ({
  type: 'paragraph',
  text: '<bold>a</bold>'.repeat(characterCount),
});
const Paragraphs = length => Array(length).fill(P());

describe('insertPodcastPromo', () => {
  it('adds a podcast promo block', () => {
    const input = buildPageFixture([...Paragraphs(7), P(500), P(500)]);

    const { paragraph: paragraphBlocks, podcastPromo: promoBlocks } = groupBy(
      path(['type']),
      transformer(input).content.blocks,
    );

    expect(paragraphBlocks.length).toBe(9);
    expect(promoBlocks.length).toBe(1);
  });

  it.each`
    scenario | inputBlocks                                      | expectedIndex
    ${1}     | ${[]}                                            | ${-1}
    ${2}     | ${Paragraphs(6)}                                 | ${-1}
    ${3}     | ${Paragraphs(7)}                                 | ${-1}
    ${4}     | ${[...Paragraphs(7), P(1000)]}                   | ${7}
    ${5}     | ${[...Paragraphs(7), P(500), P(500)]}            | ${7}
    ${6}     | ${[H, ...Paragraphs(7), P(1000)]}                | ${8}
    ${7}     | ${[...Paragraphs(7), P(500)]}                    | ${-1}
    ${8}     | ${[...Paragraphs(7), P(500), H, P(500)]}         | ${-1}
    ${9}     | ${[...Paragraphs(7), P(500), H, P(500), P(500)]} | ${9}
    ${10}    | ${[...Paragraphs(7), XMLP(500)]}                 | ${-1}
    ${11}    | ${[...Paragraphs(7), XMLP(1000)]}                | ${7}
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
    scenario | inputBlocks                                         | expectedIndex
    ${1}     | ${[...Paragraphs(7), P(1000), H]}                   | ${9}
    ${2}     | ${[...Paragraphs(7), P(500), P(500), H]}            | ${10}
    ${3}     | ${[H, ...Paragraphs(7), P(1000)]}                   | ${-1}
    ${4}     | ${[...Paragraphs(7), H, P(500), P(500)]}            | ${-1}
    ${5}     | ${[...Paragraphs(7), P(500), H, P(500), P(500), H]} | ${12}
  `(
    '[scenario $scenario]: updates simorghMetadata for subsequent block',
    ({ inputBlocks, expectedIndex }) => {
      const findClearedIndex = transformedData =>
        transformedData.content.blocks.findIndex(
          pathEq(true, ['simorghMetadata', 'clear']),
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
