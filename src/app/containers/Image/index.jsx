import React from 'react';
import { filterForBlockType } from '../../helpers/blockHandlers';
import { imageModelPropTypes } from '../../models/propTypes/image';
import Figure from '../Figure';

const DEFAULT_IMAGE_RES = 640;

const getText = ({ model }) => model.blocks[0].model.blocks[0].model.text;

const getCaption = block => {
  if (!block) {
    return null;
  }
  return getText(block);
};

const getCopyright = copyrightHolder => {
  if (copyrightHolder === 'BBC') {
    return null;
  }

  return copyrightHolder;
};

const ImageContainer = ({ blocks }) => {
  if (!blocks) {
    return null;
  }

  const rawImageBlock = filterForBlockType(blocks, 'rawImage');
  const altTextBlock = filterForBlockType(blocks, 'altText');
  const captionBlock = filterForBlockType(blocks, 'caption');

  if (!rawImageBlock || !altTextBlock) {
    return null;
  }

  const hardcodedImageWidth = DEFAULT_IMAGE_RES;
  const { locator, copyrightHolder, height, width } = rawImageBlock.model;
  const altText = getText(altTextBlock);
  const copyright = getCopyright(copyrightHolder);
  const caption = getCaption(captionBlock);
  const ratio = (height / width) * 100;
  const rawImageSrc = `https://ichef.bbci.co.uk/news/${hardcodedImageWidth}${locator}`;

  return (
    <Figure
      src={rawImageSrc}
      alt={altText}
      ratio={ratio}
      copyright={copyright}
      caption={caption}
    />
  );
};

ImageContainer.propTypes = imageModelPropTypes;

export default ImageContainer;
