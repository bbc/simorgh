import pathRamda from 'ramda/src/path';
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

const positionImage = (pageData, block) => {
  const blocks = pathRamda(['content', 'blocks'], pageData);
  const positionImageMap = blocks.reduce((map, _block) => {
    const { type, id } = _block;
    if (type === 'image') {
      map.push(id);
    }
    return map;
  }, []);

  const { id } = block;
  return positionImageMap.indexOf(id);
};

const convertImage = (block, pageData) =>
  imageBlocks(
    [
      captionBlock(block),
      altTextBlock(block),
      rawImage(block),
      { positionImage: positionImage(pageData, block) },
    ].filter(Boolean),
  );

export default convertImage;
