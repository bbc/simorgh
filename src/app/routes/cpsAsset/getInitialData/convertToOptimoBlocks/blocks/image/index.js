import { getImageParts } from './helpers';
import {
  blockContainingText,
  rawImageBlock,
  imageBlocks,
} from '#app/models/blocks';

const captionBlock = ({ caption }) => {
  if (!caption) return null;
  return blockContainingText('caption', caption);
};

const altTextBlock = ({ altText }) => {
  if (!altText) return null;
  return blockContainingText('altText', altText);
};

const rawImage = ({ copyrightHolder, height, path, width }) => {
  if (!path) return null;
  const [originCode, locator] = getImageParts(path);
  return rawImageBlock({
    copyrightHolder,
    height,
    locator,
    originCode,
    width,
  });
};

const convertImage = (block) =>
  imageBlocks(
    [captionBlock(block), altTextBlock(block), rawImage(block)].filter(Boolean),
  );

export default convertImage;
