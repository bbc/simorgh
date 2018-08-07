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

  // loop through each passed prop in the array and compares them against defined types for that block type
  propData.forEach(propValue => {
    // finds the first propType that has a type that matches the type of the passed prop
    const { props: propTypes } = propTypeData.find(
      ({ type }) => type === propValue.type,
    );

    /**
     * Checks the passed prop against the passed propType. Passed params:
     * @param {Object} propType - The prop types to check the prop against
     * @param {string} propValue - the prop to check
     * @param {string} location - 'prop' - the location of the prop check. Can be 'prop', 'context', or 'child context'
     * @param {string} propValue.type - the name being checked, usually the component
     */
    checkPropTypes(propTypes, propValue, 'prop', propValue.type);
  });

  return null;
};
