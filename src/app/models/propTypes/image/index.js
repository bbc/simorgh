import { string } from 'prop-types';
import { textBlockPropTypes } from '../text';
import { blocksWithTypes, blockOfSpecificTypeAndModel } from '../general';

const rawImageBlock = blockOfSpecificTypeAndModel('rawImage', {
  locator: string.isRequired,
});

export const altTextBlock = blockOfSpecificTypeAndModel(
  'altText',
  textBlockPropTypes,
);

export const captionBlock = blockOfSpecificTypeAndModel(
  'caption',
  textBlockPropTypes,
);

export const imageModelPropTypes = blocksWithTypes([
  rawImageBlock.isRequired,
  altTextBlock.isRequired,
  captionBlock,
]);

export const imageBlockPropTypes = blockOfSpecificTypeAndModel(
  'image',
  imageModelPropTypes,
);
