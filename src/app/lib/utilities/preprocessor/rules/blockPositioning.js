import deepGet from '../../../../helpers/json/deepGet';
import deepClone from '../../../../helpers/json/deepClone';

const insertBlockPositioning = (
  { model },
  positionArr = [],
  positionAtLevel = 0,
) => {
  if (!model || typeof model !== 'object') {
    return null;
  }

  const amendedJson = model;

  Object.keys(model).forEach(key => {
    if (key !== 'blocks') {
      return null;
    }

    let incrementPositionAtLevel = positionAtLevel;
    return model[key].map((childObj, index) => {
      const newPosition = [...positionArr, (incrementPositionAtLevel += 1)];
      const newChildObj = Object.assign(childObj, { position: newPosition });

      amendedJson[key][index] = newChildObj;
      return insertBlockPositioning(newChildObj, newPosition);
    });
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

  if (content && content.model) {
    const withBlockPositioning = insertBlockPositioning(content);

    json.content.model = withBlockPositioning;
  }

  return json;
};

export default applyBlockPositioning;
