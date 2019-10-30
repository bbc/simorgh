/* eslint-disable import/prefer-default-export */

const removeLeadingSlash = string => string.replace(/^\/+/, '');

export const getImageParts = path => {
  const pathWithoutLeadingSlash = removeLeadingSlash(path);
  const [originCode, ...locatorParts] = pathWithoutLeadingSlash.split('/');
  const locator = locatorParts.join('/');

  return [originCode, locator];
};
