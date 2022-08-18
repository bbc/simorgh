import lensPath from 'ramda/src/lensPath';
import mergeDeepLeft from 'ramda/src/mergeDeepLeft';
import path from 'ramda/src/path';
import set from 'ramda/src/set';
import view from 'ramda/src/view';

/**
 * Returns a new deeply cloned enriched page data object. `addIndexToBlockGroups` iterates over page data's top level blocks (`pageData.content.model.blocks`) and
 * calls the predicate function on each block item. The predicate receives the current iterated block as an argument that can be used to test the block group
 * structure. If the predicate function returns true then `blockGroupType` and `blockGroupIndex` props are merged into to the block group. If the predicate function
 * is false then the block group will remain unchanged. After all blocks have been iterated on, the enriched page data object is returned.
 *
 * This is a useful function for adding indexes to block groups that have a specific structure created in Optimo. For example, adding indexes to orderered lists
 * that contain list items with external links. With these indexes we can set up event tracking in the component to get insight on how a user interacts with this
 * sort of content.
 *
 * @param {callback} predicate A predicate function that receives the current top-level block group as an argument and must returns true or false.
 * @param {Object} options options.
 * @param {string} options.blockGroupType The name of `blockGroupType` type. This is added as a property to block groups that pass the predicate function. If you pass in `'listWithParagraph'` The result will look like `{ blockGroupType: 'listWithParagraph' }`.
 * @param {string[]} options.pathToBlockGroup Use this to add the `blockGroupType` and `blockGroupIndex` props to nested objects of top-level blocks that pass the predicate function. `pathToBlockGroup` should be a data path represented as an array that is used as a Ramda path e.g. `['model', 'blocks', 0]`.
 * @return {Object} the enriched page data object.
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
          const blockGroup = view(lens, block);

          if (blockGroup) {
            return [
              ...accumulator,
              set(
                lens,
                {
                  ...blockGroup,
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
