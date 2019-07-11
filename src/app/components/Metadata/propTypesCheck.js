import { checkPropTypes } from 'prop-types';

const propTypeCheck = (props, propName, componentName, propType) => {
  const { type } = props;

  const expectedType = {
    [propName]: propType,
  };

  if (type === 'article') {
    return checkPropTypes(expectedType, props, 'prop', componentName);
  }

  return null;
};

export default propTypeCheck;
