import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

const getBrandedImage = ({ locator, service, width = 1024 }) =>
  `${
    getEnvConfig().SIMORGH_ICHEF_BASE_URL
  }/news/${width}/branded_${service}/${locator}`;

export default getBrandedImage;
