import React from 'react';
import filterForBlockType from '#lib/utilities/blockHandlers';
import { imageModelPropTypes } from '#models/propTypes/image';
import ArticleFigure from '../ArticleFigure';
import {
  GridItemLargeNoMargin,
  GridItemMedium,
  GridItemSmall,
} from '#app/components/Grid';
import { createSrcset } from '#lib/utilities/srcSet';
import buildIChefURL from '#lib/utilities/ichefURL';
import urlWithPageAnchor from '#lib/utilities/pageAnchor';

const DEFAULT_IMAGE_RES = 640;
const LAZYLOAD_FROM_BLOCK = 3;

const getText = ({ model }) => model.blocks[0].model.blocks[0].model.text;

const getCopyright = copyrightHolder => {
  if (copyrightHolder === 'BBC') {
    return null;
  }

  return copyrightHolder;
};

const shouldLazyLoad = position =>
  !!urlWithPageAnchor() || position[0] > LAZYLOAD_FROM_BLOCK;

const ImageContainer = ({ blocks, position }) => {
  if (!blocks) {
    return null;
  }

  const rawImageBlock = filterForBlockType(blocks, 'rawImage');
  const altTextBlock = filterForBlockType(blocks, 'altText');
  const captionBlock = filterForBlockType(blocks, 'caption');
  const ShouldPreLoadLeadImage = position[0] <= 4;

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
  const rawImageSrc = buildIChefURL({
    originCode,
    locator,
    resolution: DEFAULT_IMAGE_RES,
  });
  const srcSet = createSrcset(originCode, locator, width);
  const lazyLoad = shouldLazyLoad(position);

  let GridWrapper = GridItemLargeNoMargin;

  if (height === width) {
    GridWrapper = GridItemMedium;
  }
  if (height > width) {
    GridWrapper = GridItemSmall;
  }

  return (
    <GridWrapper>
      <ArticleFigure
        alt={altText}
        captionBlock={captionBlock}
        copyright={copyright}
        height={height}
        ratio={ratio}
        src={rawImageSrc}
        width={width}
        srcset={srcSet}
        showCopyright
        lazyLoad={lazyLoad}
        preload={ShouldPreLoadLeadImage}
        fade
        type="image"
      />
    </GridWrapper>
  );
};

ImageContainer.propTypes = imageModelPropTypes;

ImageContainer.defaultProps = {
  position: [1],
};

export default ImageContainer;
