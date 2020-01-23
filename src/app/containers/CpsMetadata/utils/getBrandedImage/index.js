const getBrandedImage = (locator, service) => {
  const iChefHost =
    process.env.SIMORGH_APP_ENV === 'live'
      ? 'http://ichef.bbci.co.uk'
      : 'http://ichef.test.bbci.co.uk';
  return `${iChefHost}/news/1024/branded_${service}/${locator}`;
};

export default getBrandedImage;
