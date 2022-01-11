import lensPath from 'ramda/src/lensPath';
import mergeDeepLeft from 'ramda/src/mergeDeepLeft';
import path from 'ramda/src/path';
import set from 'ramda/src/set';
import view from 'ramda/src/view';

const addIndexToBlockGroups =
  (predicate, { blockGroupType, pathToBlockGroup = [] }) =>
  pageData => {
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
