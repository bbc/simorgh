import deepClone from 'ramda/src/clone';
import deepGet from '../../deepGet';

const insertBlockPositioning = ({ model }, positionArr = []) => {
  if (!deepGet(['blocks'], model)) {
    return model;
  }

  const amendedJson = model;
  let incrementPositionAtLevel = 0;

  for (let i = 0; i < model.blocks.length; i += 1) {
    const newPosition = [...positionArr, (incrementPositionAtLevel += 1)];
    const currentBlock = amendedJson.blocks[i];

    currentBlock.position = newPosition;
    insertBlockPositioning(currentBlock, newPosition);
  }

  return amendedJson;
};

/**
 * This preprocessor rule inserts a `position` property to each block object,
 * denoting its ordinal position in an array.
 * @param {Object} obj
 */
const applyBlockPositioning = obj => {
  const json = deepClone(obj);
  const content = deepGet(['content'], obj);

  if (deepGet(['model'], content)) {
    const withBlockPositioning = insertBlockPositioning(content);

    json.content.model = withBlockPositioning;
  }

  return json;
};

export default applyBlockPositioning;
