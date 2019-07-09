const propTypeCheck = (props, propName, propType) => {
  const { type } = props;
  // eslint-disable-next-line react/destructuring-assignment
  const propsValue = props[propName];

  // eslint-disable-next-line valid-typeof
  if (type === 'article' && typeof propsValue !== propType) {
    return new Error(
      `${propName} is a required prop and should be a ${propType}`,
    );
  }

  return null;
};

export default propTypeCheck;
