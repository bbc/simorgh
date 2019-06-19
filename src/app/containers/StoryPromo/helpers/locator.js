const getLocator = path => {
  if (!path) {
    return null;
  }

  const items = path.slice(1).split('/');
  if (items.length === 0) {
    return null;
  }
  const locator = items.slice(1).join('/');
  return locator;
};

export default getLocator;
