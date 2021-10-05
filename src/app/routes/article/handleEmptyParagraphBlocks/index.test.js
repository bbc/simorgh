import removeEmptyParagraphs from '.';
import {
  buildFixture,
  mediaBlock,
  groupBlock,
  headlineBlock,
  unorderedListBlock,
  textBlock,
  paragraphBlock,
  emptyParagraphBlock,
  defaultIds,
} from '../fixtures';

describe('Empty paragraph check', () => {});

// check empty paragraph + fragment is deleted
// check empty paragraph but extant fragment is not deleted
// for each check no other blocks are deleted
