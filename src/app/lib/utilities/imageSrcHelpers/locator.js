const getLocator = path => {
  if (!path || path.indexOf('/') === -1) {
    return null;
  }

  const items = path.slice(1).split('/');
  const locator = items.slice(1).join('/');
  return locator;
};

export default getLocator;
