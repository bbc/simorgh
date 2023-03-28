const getBrandedImage = (locator, service) =>
  `${process.env.SIMORGH_ICHEF_BASE_URL}/ace/standard/1024/branded_${service}/${locator}`;

export default getBrandedImage;
