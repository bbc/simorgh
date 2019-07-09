import { checkPropTypes } from 'prop-types';

const propTypeCheck = (props, componentName, propType) => {
  const { type } = props;

  const expectedType = {
    [componentName]: propType,
  };

  if (type === 'article') {
    return checkPropTypes(expectedType, props, 'prop', 'Metadata');
  }

  return null;
};

export default propTypeCheck;
