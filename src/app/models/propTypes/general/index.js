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

const requiredPropCheck = (propData, propTypes) => {
  // get types of required props
  const requiredProps = propTypes
    .filter(({ isRequired }) => isRequired)
    .map(({ type }) => type);

  // get types of passed props
  const propDataTypes = propData.map(({ type }) => type);

  // get types of required props that are not passed
  return requiredProps.reduce((missingProps, requiredProp) => {
    if (!propDataTypes.includes(requiredProp)) {
      missingProps.push(requiredProp);
    }

    return missingProps;
  }, []);
};

export const arrayOfSpecificObjects = propTypeData => (props, key) => {
  const { [key]: propData } = props;

  // checks required props
  const missingRequiredProps = requiredPropCheck(propData, propTypeData);

  // throw error if missing required props
  if (missingRequiredProps.length > 0) {
    return new Error(`Missing required props: ${missingRequiredProps}`);
  }

  // loop through props and compare against defined types for that block type
  propData.forEach(prop => {
    const { props: propTypes } = propTypeData.find(
      ({ type }) => type === prop.type,
    );

    checkPropTypes(propTypes, prop, 'prop', prop.type);
  });

  return null;
};
