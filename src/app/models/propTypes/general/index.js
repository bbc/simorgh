import {
  shape,
  string,
  oneOf,
  arrayOf,
  oneOfType,
  checkPropTypes,
} from 'prop-types';

export const blockObjectOfSpecificTypeAndModel = (type, model) => ({
  blockId: string.isRequired,
  type: oneOf([type]).isRequired,
  model: shape(model).isRequired,
});

export const blockOfSpecificTypeAndModel = (type, model) =>
  shape(blockObjectOfSpecificTypeAndModel(type, model));

export const blocksWithTypes = blockTypes => ({
  blocks: arrayOf(oneOfType(blockTypes).isRequired).isRequired,
});

export const arrayOfSpecificObjects = (requiredPropCheck, propTypes) =>
  arrayOf((props, key) => {
    requiredPropCheck(props);
    const prop = props[key];
    const propType = propTypes[prop.type];

    checkPropTypes(propType, prop, 'prop', prop.type);

    return null;
  });
