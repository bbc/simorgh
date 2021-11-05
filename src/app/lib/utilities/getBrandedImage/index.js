const getBrandedImage = (locator, service) =>
  `${process.env.SIMORGH_ICHEF_BASE_URL}/news/1024/branded_${service}/${locator}`;

export default getBrandedImage;
