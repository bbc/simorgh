import path from 'ramda/src/path';
import pipe from 'ramda/src/pipe';

import {
  buildFixture,
  mediaBlock,
  groupBlock,
  headlineBlock,
  unorderedListBlock,
  textBlock,
  defaultIds,
} from '../fixtures';
import transformer from '.';

const { media, group, list, headline, text } = defaultIds;

const getBlocks = path(['content', 'model', 'blocks']);

const runTest = (fixture, ...tests) =>
  pipe(buildFixture, transformer, getBlocks, ...tests)(fixture);

const findBlock = (id, blocks) => {
  if (!blocks || !blocks.length) return null;

  for (let i = 0; i < blocks.length; i += 1) {
    if (blocks[i].id === id) return blocks[i];
    const recursiveResult = findBlock(id, blocks[i].model?.blocks);
    if (recursiveResult) return recursiveResult;
  }
  return null;
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
    runTest([mediaBlock()], validateBlockIncluded(media));
  });

  it('does not remove unrelated blocks when a valid gist block exists', () => {
    runTest(
      [
        mediaBlock(),
        groupBlock({
          intentType: 'overview',
          blocks: [textBlock({ blocks: [unorderedListBlock()] })],
        }),
      ],
      validateBlockIncluded(media),
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
          blocks: [textBlock({ blocks: [unorderedListBlock()] })],
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
          blocks: [mediaBlock()],
        }),
      ],
      validateBlocksExcluded(group, media),
    );
  });

  it('removes overview groups when they do not have a text block in position 0', () => {
    runTest(
      [
        groupBlock({
          intentType: 'overview',
          blocks: [mediaBlock(), textBlock({ blocks: [unorderedListBlock()] })],
        }),
      ],
      validateBlocksExcluded(group, media, text, list),
    );
  });

  it('removes overview groups when their text block does not have an unordered list', () => {
    runTest(
      [
        groupBlock({
          intentType: 'overview',
          blocks: [textBlock({ blocks: [mediaBlock()] })],
        }),
      ],
      validateBlocksExcluded(group, text, media),
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
          blocks: [textBlock({ blocks: [mediaBlock(), unorderedListBlock()] })],
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
              blocks: [mediaBlock(), unorderedListBlock()],
            }),
          ],
        }),
      ],
      validateBlocksIncluded(group, text, list),
      validateBlocksExcluded(media),
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

const validateBlockOrder = (...order) => blocks => {
  order.forEach((id, position) => expect(blocks[position].id).toBe(id));
  return blocks;
};

describe('Gist block positioning', () => {
  it('is moved to top when article has no headline', () => {
    runTest(
      [
        textBlock(),
        groupBlock({
          intentType: 'overview',
          blocks: [
            textBlock({
              blocks: [unorderedListBlock()],
            }),
          ],
        }),
      ],
      validateBlockOrder(group, text),
    );
  });

  it('is is moved below the first headline', () => {
    runTest(
      [
        textBlock(),
        groupBlock({
          intentType: 'overview',
          blocks: [
            textBlock({
              blocks: [unorderedListBlock()],
            }),
          ],
        }),
        headlineBlock(),
      ],
      validateBlockOrder(text, headline, group),
    );
  });

  it('is moved below a media block that appears immediately after the first headline', () => {
    ['image', 'audio', 'video'].forEach(mediaBlockType =>
      runTest(
        [
          textBlock(),
          groupBlock({
            intentType: 'overview',
            blocks: [
              textBlock({
                blocks: [unorderedListBlock()],
              }),
            ],
          }),
          headlineBlock(),
          mediaBlock({ type: mediaBlockType }),
        ],
        validateBlockOrder(text, headline, media, group),
      ),
    );
  });
});
