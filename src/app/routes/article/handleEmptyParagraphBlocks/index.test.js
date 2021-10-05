import path from 'ramda/src/path';
import pipe from 'ramda/src/pipe';

import removeEmptyParagraphs from '.';
import {
  buildFixture,
  mediaBlock,
  headlineBlock,
  unorderedListBlock,
  textBlock,
  paragraphBlock,
  emptyParagraphBlock,
  defaultIds,
} from '../fixtures';
import {
  validateBlocksExcluded,
  validateBlockExcluded,
  validateBlocksIncluded,
} from '../testHelpers';

const { media, list, headline, text, paragraph } = defaultIds;

const getBlocks = path(['content', 'model', 'blocks']);

const runTest = (fixture, ...tests) =>
  pipe(buildFixture, removeEmptyParagraphs, getBlocks, ...tests)(fixture);

describe('Empty paragraph check', () => {
  it('does not remove unrelated blocks', () => {
    runTest(
      [
        headlineBlock(),
        mediaBlock(),
        textBlock({
          blocks: [paragraphBlock(), unorderedListBlock()],
        }),
      ],
      validateBlocksIncluded(headline, media, text, paragraph, list),
    );
  });

  it('removes empty paragraph block', () => {
    runTest(
      [
        textBlock({
          blocks: [emptyParagraphBlock('emptyParagraph')],
        }),
      ],
      validateBlockExcluded('emptyParagraph'),
    );
  });

  it('removes multiple empty paragraph blocks', () => {
    runTest(
      [
        textBlock({
          blocks: [
            paragraphBlock({ id: 'paragraph-a' }),
            emptyParagraphBlock({ id: 'emptyParagraph-a' }),
            emptyParagraphBlock({ id: 'emptyParagraph-b' }),
          ],
        }),
        textBlock({
          blocks: [
            emptyParagraphBlock({ id: 'emptyParagraph-c' }),
            paragraphBlock({ id: 'paragraph-b' }),
          ],
        }),
      ],
      validateBlocksIncluded('paragraph-a', 'paragraph-b'),
      validateBlocksExcluded(
        'emptyParagraph-a',
        'emptyParagraph-b',
        'emptyParagraph-c',
      ),
    );
  });
});
