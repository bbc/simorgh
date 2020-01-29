import getBrandedImage from '../../../src/app/containers/CpsMetadata/utils/getBrandedImage';
import { getImageParts } from '../../../src/app/lib/utilities/preprocessor/rules/cpsAssetPage/convertToOptimoBlocks/blocks/image/helpers';

export default (imagePath, service) => {
  const [, locator] = getImageParts(imagePath);
  return getBrandedImage(locator, service);
};
