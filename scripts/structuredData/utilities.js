const path = require('ramda/src/path');

const isCps = (jsonData) => jsonData.promo.type === 'cps';

const removeLeadingSlash = (string) => string.replace(/^\/+/, '');

const getBrandedImage = ({ service, imagePath }) => {
  const pathWithoutLeadingSlash = removeLeadingSlash(imagePath);
  const [, ...locatorParts] = pathWithoutLeadingSlash.split('/');
  const locator = locatorParts.join('/');

  return `http://ichef.test.bbci.co.uk/news/1024/branded_${service}/${locator}`;
};

const getImageSrc = (jsonData, serviceConfig = {}) => {
  const imagePath = path(['promo', 'indexImage', 'path'], jsonData);

  return imagePath && isCps(jsonData)
    ? getBrandedImage({ imagePath, service: serviceConfig.service })
    : serviceConfig.defaultImage;
};

const getImageAltText = (jsonData, serviceConfig = {}) => {
  const indexImage = path(['promo', 'indexImage'], jsonData);

  return indexImage && isCps(jsonData) && indexImage.altText
    ? indexImage.altText
    : serviceConfig.defaultImageAltText;
};

const getDescription = (jsonData) => {
  const promoSummary = path(['promo', 'summary'], jsonData);
  const metadataSummary = path(['metadata', 'summary'], jsonData);
  return promoSummary || metadataSummary;
};

const getTitle = (jsonData, serviceConfig = {}) => {
  const headline = path(['promo', 'headlines', 'headline'], jsonData);
  const seoHeadline = path(['promo', 'headlines', 'seoHeadline'], jsonData);
  const { frontPageTitle } = serviceConfig;
  const promoName = path(['promo', 'name'], jsonData);

  const pageTypeTitle = {
    MAP: headline,
    STY: headline,
    PGL: headline,
    article: seoHeadline,
    'WS-LIVE': promoName,
    IDX: frontPageTitle,
    WSRADIO: headline,
  };

  return `${pageTypeTitle[jsonData.metadata.type]} - ${
    serviceConfig.brandName
  }`;
};

module.exports = {
  getImageSrc,
  getImageAltText,
  getDescription,
  getTitle,
};
