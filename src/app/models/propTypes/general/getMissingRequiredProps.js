const getMissingRequiredProps = (propData, propTypes) => {
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

export default getMissingRequiredProps;
