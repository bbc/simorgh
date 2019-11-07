const getIChefURL = (originCode, locator, resolution) =>
  `https://ichef.bbci.co.uk/news/${resolution}/${originCode}/${locator}`;
export default getIChefURL;
