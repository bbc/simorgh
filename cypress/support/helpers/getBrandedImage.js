import { getImageParts } from '../../../src/app/routes/cpsAsset/getInitialData/convertToOptimoBlocks/blocks/image/helpers';

export default ({ imagePath, serviceName }) => {
  const [, locator] = getImageParts(imagePath);
  const iChefHost =
    Cypress.env('APP_ENV') === 'live'
      ? 'http://ichef.bbci.co.uk'
      : 'http://ichef.test.bbci.co.uk';
  return `${iChefHost}/news/1024/branded_${serviceName}/${locator}`;
};
