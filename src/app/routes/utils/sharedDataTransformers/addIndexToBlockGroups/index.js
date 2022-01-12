import lensPath from 'ramda/src/lensPath';
import mergeDeepLeft from 'ramda/src/mergeDeepLeft';
import path from 'ramda/src/path';
import set from 'ramda/src/set';
import view from 'ramda/src/view';

/**
 * Iterates over page data with the content.model.blocks structure and calls the predicate function on each top level block item. The predicate receives the current iterated block as an argument. If the predicate function returns true then blockGroupType and blockGroupIndex properties are added to the block group and returned as in a new page data object. If the predicate function is false then the block group will remain unchanged.
 *
 * @param {callback} predicate A function that returns true or false. When true, the current iterated block will receive the blockGroupType and blockGroupIndex properties. When false, the current iterated block will be unaffacted.
 * @param {Object} options options.
 * @param {string} options.blockGroupType The name of blockGroupType type. This is added as a property to block groups that pass the predicate function. If you pass in 'listWithParagraph' The result will look like { blockGroupType: 'listWithParagraph' }
 * @param {string[]} options.pathToBlockGroup Use this to add blockGroupType and blockGroupIndex properties to a nested objects of blocks that pass the predicate function. pathToBlockGroup should be a data path represented as an array that is used as a Ramda path e.g. ['model', 'blocks', 0] .
 * @return {Object} the new page data object.
 */

const addIndexToBlockGroups =
  (predicate, { blockGroupType, pathToBlockGroup = [] }) =>
  pageData => {
    if (!blockGroupType) {
      throw new Error('blockGroupType option is not defined.');
    }

    const blocks = path(['content', 'model', 'blocks'], pageData);

    if (blocks) {
      const newBlocks = blocks.reduce((accumulator, block) => {
        const matchesBlock = predicate(block);

        if (matchesBlock) {
          const accumulatedBlocks = accumulator.filter(predicate);
          const previousMatchingBlock =
            accumulatedBlocks[accumulatedBlocks.length - 1];
          const blockGroupIndex = previousMatchingBlock
            ? path(pathToBlockGroup, previousMatchingBlock).blockGroupIndex + 1
            : 1;
          const lens = lensPath(pathToBlockGroup);
          const blockGroupBlock = view(lens, block);

          if (blockGroupBlock) {
            return [
              ...accumulator,
              set(
                lens,
                {
                  ...blockGroupBlock,
                  blockGroupType,
                  blockGroupIndex,
                },
                block,
              ),
            ];
          }
        }

        return [...accumulator, block];
      }, []);

      return mergeDeepLeft(
        {
          content: {
            model: {
              blocks: newBlocks,
            },
          },
        },
        pageData,
      );
    }

    return pageData;
  };

export default addIndexToBlockGroups;
