const getIChefURL = (originCode, locator, resolution) => {
  if (originCode === 'pips') {
    return locator;
  }
  return `https://ichef.bbci.co.uk/news/${resolution}/${originCode}/${locator}`;
};
export default getIChefURL;
