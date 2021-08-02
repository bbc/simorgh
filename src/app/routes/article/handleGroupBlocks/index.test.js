import path from 'ramda/src/path';
import pipe from 'ramda/src/pipe';

import {
  buildFixture,
  imageBlock,
  groupBlock,
  unorderedListBlock,
  textBlock,
  defaultIds,
} from './fixtures';
import transformer from '.';

const { image, group, list, paragraph, text } = defaultIds;
const getBlocks = path(['content', 'model', 'blocks']);

const runTest = (fixture, ...tests) =>
  pipe(buildFixture, transformer, getBlocks, ...tests)(fixture);

const findBlock = (id, blocks) => {
  if (!blocks || !blocks.length) return false;

  for (let i = 0; i < blocks.length; i += 1) {
    if (blocks[i].id === id) return blocks[i];
    const dfsResult = findBlock(id, blocks[i].model?.blocks);
    if (dfsResult) return dfsResult;
  }
  return false;
};

const validateBlockIncluded = id => blocks => {
  expect(findBlock(id, blocks)).toBeTruthy();
  return blocks;
};

const validateBlocksIncluded = (...ids) => blocks => {
  ids.forEach(id => validateBlockIncluded(id)(blocks));
  return blocks;
};

const validateBlockExcluded = id => blocks => {
  expect(findBlock(id, blocks)).toBeFalsy();
  return blocks;
};

const validateBlocksExcluded = (...ids) => blocks => {
  ids.forEach(id => validateBlockExcluded(id)(blocks));
  return blocks;
};

describe('Gist data selection', () => {
  it('does not remove unrelated blocks', () => {
    runTest([imageBlock()], validateBlockIncluded(image));
  });

  it('does not remove unrelated blocks when a valid gist block exists', () => {
    runTest(
      [
        imageBlock(),
        groupBlock({
          intentType: 'overview',
          blocks: [textBlock({ blocks: [unorderedListBlock()] })],
        }),
      ],
      validateBlockIncluded(image),
    );
  });

  it('removes non-overview group blocks', () => {
    runTest(
      [groupBlock({ intentType: 'not-overview', blocks: [] })],
      validateBlockExcluded(group),
    );
  });

  it('removes non-overview group blocks even when they have a valid gist block structure', () => {
    runTest(
      [
        groupBlock({
          intentType: 'not-overview',
          blocks: [textBlock({ blocks: [unorderedListBlock('list')] })],
        }),
      ],
      validateBlocksExcluded(group, text, list),
    );
  });

  it('removes overview groups when they have no blocks', () => {
    runTest(
      [groupBlock({ intentType: 'overview', blocks: [] })],
      validateBlockExcluded(group),
    );
  });

  it('removes overview groups when they do not have a text block', () => {
    runTest(
      [
        groupBlock({
          intentType: 'overview',
          blocks: [imageBlock()],
        }),
      ],
      validateBlocksExcluded(group, image),
    );
  });

  it('removes overview groups when they do not have a text block in position 0', () => {
    runTest(
      [
        groupBlock({
          intentType: 'overview',
          blocks: [imageBlock(), textBlock({ blocks: [unorderedListBlock()] })],
        }),
      ],
      validateBlocksExcluded(group, image, text, list),
    );
  });

  it('removes overview groups when their text block does not have an unordered list', () => {
    runTest(
      [
        groupBlock({
          intentType: 'overview',
          blocks: [textBlock({ blocks: [imageBlock()] })],
        }),
      ],
      validateBlocksExcluded(group, text, image),
    );
  });

  it('retains overview groups when their text block has an unordered list', () => {
    runTest(
      [
        groupBlock({
          intentType: 'overview',
          blocks: [textBlock({ blocks: [unorderedListBlock()] })],
        }),
      ],
      validateBlocksIncluded(group, text, list),
    );
  });

  it('retains overview groups when their text block has an unordered list in any position', () => {
    runTest(
      [
        groupBlock({
          intentType: 'overview',
          blocks: [textBlock({ blocks: [imageBlock(), unorderedListBlock()] })],
        }),
      ],
      validateBlocksIncluded(group, text, list),
    );
  });

  it('retains only the first valid overview group', () => {
    runTest(
      [
        groupBlock({
          intentType: 'overview',
          blocks: [textBlock({ blocks: [unorderedListBlock()] })],
        }),
        groupBlock({
          intentType: 'overview',
          id: 'group-b',
          blocks: [
            textBlock({
              id: 'text-b',
              blocks: [unorderedListBlock({ id: 'list-b' })],
            }),
          ],
        }),
      ],
      validateBlocksIncluded(group, text, list),
      validateBlocksExcluded('group-b', 'text-b', 'list-b'),
    );
  });
});

describe('Gist block cleaning', () => {
  it('Retains only the first block within the group', () => {
    runTest(
      [
        groupBlock({
          intentType: 'overview',
          blocks: [
            textBlock({
              blocks: [unorderedListBlock()],
            }),
            textBlock({
              id: 'text-b',
              blocks: [unorderedListBlock({ id: 'list-b' })],
            }),
          ],
        }),
      ],
      validateBlocksIncluded(group, text, list),
      validateBlocksExcluded('text-b', 'list-b'),
    );
  });

  it('Removes non-list blocks from the inner text block', () => {
    runTest(
      [
        groupBlock({
          intentType: 'overview',
          blocks: [
            textBlock({
              blocks: [imageBlock(), unorderedListBlock()],
            }),
          ],
        }),
      ],
      validateBlocksIncluded(group, text, list),
      validateBlocksExcluded(image),
    );
  });

  it('Merges multiple lists into one', () => {
    const transformedBlocks = runTest(
      [
        groupBlock({
          intentType: 'overview',
          blocks: [
            textBlock({
              blocks: [
                unorderedListBlock(),
                unorderedListBlock({ id: 'merge-me' }),
                unorderedListBlock({ id: 'merge-me-too' }),
              ],
            }),
          ],
        }),
      ],
      validateBlocksIncluded(group, text, list),
      validateBlocksExcluded('merge-me', 'merge-me-too'),
    );

    const listItems = findBlock(list, transformedBlocks).model.blocks;
    expect(listItems.length).toBe(3);
  });
});

const validateBlockPosition = (id, position) => {};

describe('Gist block positioning', () => {});
