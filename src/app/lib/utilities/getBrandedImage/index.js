import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

const getBrandedImage = (locator, service) =>
  `${
    getEnvConfig().SIMORGH_ICHEF_BASE_URL
  }/news/1024/branded_${service}/${locator}`;

export default getBrandedImage;
