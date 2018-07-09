import { bool, string } from 'prop-types';
import { altTextBlock, captionBlock, imageBlockPropTypes } from '../image';
import { blockOfSpecificTypeAndModel, blocksWithTypes } from '../general';

const rawVideoBlock = blockOfSpecificTypeAndModel('rawVideo', {
  isLive: bool,
  duration: string,
  locator: string.isRequired,
});

export const videoBlockPropTypes = blocksWithTypes([
  rawVideoBlock.isRequired,
  altTextBlock.isRequired,
  captionBlock,
  imageBlockPropTypes,
]);

export const imageModelPropTypes = blockOfSpecificTypeAndModel(
  'video',
  videoBlockPropTypes,
);
