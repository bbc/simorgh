import React from 'react';
import { filterForBlockType } from '../../helpers/blockHandlers';
import { imageModelPropTypes } from '../../models/propTypes/image';
import Figure from '../Figure';
import {
  GridItemConstrainedLargeNoMargin,
  GridItemConstrainedMedium,
  GridItemConstrainedSmall,
} from '../../lib/styledGrid';

const DEFAULT_IMAGE_RES = 640;

const getText = ({ model }) => model.blocks[0].model.blocks[0].model.text;

const getCopyright = copyrightHolder => {
  if (copyrightHolder === 'BBC') {
    return null;
  }

  return copyrightHolder;
};

const getIChefURL = (originCode, locator) => {
  // temp code - default to 'cpsdevpb' until Optimo complete work to supply non-empty originCode
  const overridableOriginCode = originCode || 'cpsdevpb';

  return `https://ichef.bbci.co.uk/news/${DEFAULT_IMAGE_RES}/${overridableOriginCode}/${locator}`;
};

const getRawImageSrc = (originCode, locator) =>
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
  const ratio = (height / width) * 100;
  const rawImageSrc = getRawImageSrc(originCode, locator);

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
        lazyLoad
      />
    </Wrapper>
  );
};

ImageContainer.propTypes = imageModelPropTypes;

export default ImageContainer;
