import { shape, oneOf, arrayOf, oneOfType, checkPropTypes } from 'prop-types';
import getMissingRequiredProps from './getMissingRequiredProps';

export const blockObjectOfTypesAndModel = (types, model) => ({
  type: oneOf(types).isRequired,
  model: shape(model).isRequired,
});

export const blockOfTypesAndModel = (types, model) =>
  shape(blockObjectOfTypesAndModel(types, model));

export const blocksWithTypes = blockTypes => ({
  blocks: arrayOf(oneOfType(blockTypes).isRequired).isRequired,
});

export const arrayOfSpecificBlocks = propTypeData => (
  props,
  key,
  componentName,
) => {
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
     * @param {Object} propTypes - The prop types to check the prop against
     * @param {string} propValue - the prop to check
     * @param {string} location - 'prop' - the location of the prop check
     * @param {string} name - the name of the item being checked. Passing type value of the prop and component for specificity
     */
    checkPropTypes(
      propTypes,
      propValue,
      'prop',
      `${propValue.type} - ${componentName}`,
    );
  });

  return null;
};
