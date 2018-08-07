import {
  shape,
  string,
  oneOf,
  arrayOf,
  oneOfType,
  checkPropTypes,
} from 'prop-types';
import getMissingRequiredProps from './getMissingRequiredProps';

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

export const arrayOfSpecificBlocks = propTypeData => (props, key) => {
  const { [key]: propData } = props;

  if (!Array.isArray(propData)) {
    return new Error(`Invalid props: ${key} is not an array.`);
  }

  // checks required props
  const missingRequiredProps = getMissingRequiredProps(propData, propTypeData);

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
