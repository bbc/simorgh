import React from 'react';
import { filterForBlockType } from '../../helpers/blockHandlers';
import { imageModelPropTypes } from '../../models/propTypes/image';
import Figure from '../Figure';

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

const getIChefURL = (originCode, locator) =>
  `https://ichef.bbci.co.uk/news/640/${originCode}/${
    locator.split('http://c.files.bbci.co.uk/')[1]
  }`;

const getRawImageSrc = (originCode, locator) =>
  originCode === 'cpsprodpb' ? getIChefURL(originCode, locator) : locator;

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

  const { locator, originCode, copyrightHolder } = rawImageBlock.model;
  const altText = getText(altTextBlock);
  const copyright = getCopyright(copyrightHolder);
  const caption = getCaption(captionBlock);
  const rawImageSrc = getRawImageSrc(originCode, locator);

  return (
    <Figure
      src={rawImageSrc}
      alt={altText}
      copyright={copyright}
      caption={caption}
    />
  );
};

ImageContainer.propTypes = imageModelPropTypes;

export default ImageContainer;
