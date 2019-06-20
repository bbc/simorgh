const getOriginCode = path => {
  if (!path) {
    return null;
  }

  const items = path.slice(1).split('/');
  const [originCode] = items;
  if (!originCode) {
    return null;
  }
  return originCode;
};

export default getOriginCode;
