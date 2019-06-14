import React from 'react';
import filterForBlockType from '../../lib/utilities/blockHandlers';
import { imageModelPropTypes } from '../../models/propTypes/image';
import Figure from '../Figure';
import {
  GridItemConstrainedLargeNoMargin,
  GridItemConstrainedMedium,
  GridItemConstrainedSmall,
} from '../../lib/styledGrid';
import createSrcset from './helpers/srcSet';
import getIChefURL from './helpers/ichefUrl';

const DEFAULT_IMAGE_RES = 640;

const getText = ({ model }) => model.blocks[0].model.blocks[0].model.text;

const getCopyright = copyrightHolder => {
  if (copyrightHolder === 'BBC') {
    return null;
  }

  return copyrightHolder;
};

const getRawImageSrc = (originCode, locator) =>
  originCode !== 'pips'
    ? getIChefURL(originCode, locator, DEFAULT_IMAGE_RES)
    : locator;

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
  const ratio = (height / width) * 100;
  const rawImageSrc = getRawImageSrc(originCode, locator);
  const srcSet = createSrcset(originCode, locator, width);

  let Wrapper = GridItemConstrainedLargeNoMargin;

  if (height === width) {
    Wrapper = GridItemConstrainedMedium;
  }
  if (height > width) {
    Wrapper = GridItemConstrainedSmall;
  }

  // This grid contain will be refactored in
  // https://github.com/bbc/simorgh/issues/1369
  // https://github.com/bbc/simorgh/issues/1319
  return (
    <Wrapper>
      <Figure
        alt={altText}
        captionBlock={captionBlock}
        copyright={copyright}
        height={height}
        ratio={ratio}
        src={rawImageSrc}
        width={width}
        srcset={srcSet}
        lazyLoad
      />
    </Wrapper>
  );
};

ImageContainer.propTypes = imageModelPropTypes;

export default ImageContainer;
