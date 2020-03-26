import pathOr from 'ramda/src/pathOr';
import { htmlEscape } from 'escape-goat';

const escapeHtmlInBlock = block => {
  const escapedBlock = JSON.stringify(block, (_key, value) =>
    typeof value === 'string' ? htmlEscape(value) : value,
  );
  return JSON.parse(escapedBlock);
};

/**
 * Returns a function which accepts a page data object. Any blocks that match
 * a type found in 'types' will have their HTML special characters escaped.
 * @param {Array} types An array of Optimo block types.
 */
const escapeHtmlInBlockTypes = types => {
  return pageData => {
    if (!types) return pageData;

    const blocks = pathOr([], ['content', 'model', 'blocks'], pageData);
    const escapedBlocks = blocks.map(block =>
      types.includes(block.type) ? escapeHtmlInBlock(block) : block,
    );

    return {
      ...pageData,
      content: {
        model: {
          blocks: escapedBlocks,
        },
      },
    };
  };
};

export default escapeHtmlInBlockTypes;
