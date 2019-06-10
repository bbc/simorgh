import deepGet from '../../../../helpers/json/deepGet';
import deepClone from '../../../../helpers/json/deepClone';

const insertBlockPositioning = (
  { model },
  positionArr = [],
  positionAtLevel = 0,
) => {
  if (typeof model !== 'object') {
    return null;
  }

  const newObj = model;

  Object.keys(model).forEach(key => {
    if (key !== 'blocks') {
      return null;
    }

    let incPositionAtLevel = positionAtLevel;
    return model[key].map((childObj, index) => {
      const newPosition = [...positionArr, (incPositionAtLevel += 1)];
      const newChildObj = Object.assign(childObj, { pos: newPosition });

      newObj[key][index] = newChildObj;
      return insertBlockPositioning(newChildObj, newPosition);
    });
  });

  return newObj;
};

const applyBlockPositioning = obj => {
  const objCopy = deepClone(obj);
  const content = deepGet(['content'], obj);
  const withBlockPositioning = insertBlockPositioning(content);

  objCopy.content.model = withBlockPositioning;

  return objCopy;
};

export default applyBlockPositioning;
