import deepGet from '../../../../helpers/json/deepGet';
import deepClone from '../../../../helpers/json/deepClone';

const insertBlockPositioning = ({ model }, positionArr = []) => {
  if (!deepGet(['blocks'], model)) {
    return model;
  }

  const amendedJson = model;
  let incrementPositionAtLevel = 0;

  model.blocks.forEach((childObj, index) => {
    const newPosition = [...positionArr, (incrementPositionAtLevel += 1)];
    const newChildObj = Object.assign(childObj, { position: newPosition });

    amendedJson.blocks[index] = newChildObj;
    insertBlockPositioning(newChildObj, newPosition);
  });

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
