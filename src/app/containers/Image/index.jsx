import React from 'react';
import { filterForBlockType } from '../../helpers/blockHandlers';
import { imageModelPropTypes } from '../../models/propTypes/image';
import Figure from '../Figure';

const noJsSrcValue = 320;
const noJsSrcSetValues = [240, 320, 480, 624];
const srcValue = 480;
const srcSetValues = [240, 320, 480, 624, 800];
const recipeRegex = /\$recipe/;

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

const generateImageSrc = (imgUrl, recipeValue) =>
  imgUrl.replace(recipeRegex, recipeValue);

const generateSrcSet = (imgUrl, srcSetArray) => {
  const srcSetUrls = srcSetArray.map(
    value => `${generateImageSrc(imgUrl, value)} ${value}w`,
  );

  return srcSetUrls.join(', ');
};

const getIChefURL = (originCode, locator) => {
  // temp code - default to 'cpsdevpb' until Optimo complete work to supply non-empty originCode
  const overridableOriginCode = originCode || 'cpsdevpb';

  return `https://ichef.bbci.co.uk/news/$recipe/${overridableOriginCode}/${locator}`;
};

const getImageUrl = (originCode, locator) =>
  originCode !== 'pips' ? getIChefURL(originCode, locator) : locator;

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

  const {
    locator,
    originCode,
    copyrightHolder,
    height,
    width,
  } = rawImageBlock.model;
  const altText = getText(altTextBlock);
  const copyright = getCopyright(copyrightHolder);
  const caption = getCaption(captionBlock);
  const ratio = (height / width) * 100;
  const imageUrl = getImageUrl(originCode, locator);
  const rawImageSrc = generateImageSrc(imageUrl, srcValue);
  const noJsSrc = generateImageSrc(imageUrl, noJsSrcValue);
  const srcSet = generateSrcSet(imageUrl, srcSetValues);
  const noJsSrcSet = generateSrcSet(imageUrl, noJsSrcSetValues);

  return (
    <Figure
      src={rawImageSrc}
      noJsSrc={noJsSrc}
      srcSet={srcSet}
      noJsSrcSet={noJsSrcSet}
      alt={altText}
      ratio={ratio}
      copyright={copyright}
      caption={caption}
    />
  );
};

ImageContainer.propTypes = imageModelPropTypes;

export default ImageContainer;
