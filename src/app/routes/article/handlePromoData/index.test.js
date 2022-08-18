import path from 'ramda/src/path';
import pipe from 'ramda/src/pipe';

import handleOptimoPromoData from '.';
import {
  buildFixture,
  headlineBlock,
  textBlock,
  paragraphBlock,
  promoBlock,
  defaultIds,
} from '../fixtures';

import { validateBlocksIncluded } from '../testHelpers';

const { links, headline, text } = defaultIds;
const getBlocks = path(['content', 'model', 'blocks']);

const runTest = (fixture, ...tests) =>
  pipe(buildFixture, handleOptimoPromoData, getBlocks, ...tests)(fixture);

const validateBlockType = (type, position) => blocks => {
  expect(blocks[position].type === type);
  return blocks;
};

describe('Handle promo data', () => {
  it('should change links block type to relatedContent if final block in article data', () => {
    runTest(
      [
        headlineBlock(),
        textBlock({
          blocks: [paragraphBlock()],
        }),
        promoBlock(),
        promoBlock('relatedContent'),
      ],
      validateBlocksIncluded(headline, text, links, 'relatedContent'),
      validateBlockType(links, 2),
      validateBlockType('relatedContent', 3),
    );
  });
  it('should not change links block type if not final block in article data', () => {
    runTest(
      [
        promoBlock(),
        textBlock({
          blocks: [paragraphBlock()],
        }),
      ],
      validateBlocksIncluded(text, links),
      validateBlockType(links, 0),
    );
  });
});
