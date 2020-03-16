import React from 'react';
import filterForBlockType from '#lib/utilities/blockHandlers';
import { imageModelPropTypes } from '#models/propTypes/image';
import ArticleFigure from '../ArticleFigure';
import {
  GridItemConstrainedLargeNoMargin,
  GridItemConstrainedMedium,
  GridItemConstrainedSmall,
} from '#lib/styledGrid';
import createSrcset from '#lib/utilities/srcSet';
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
    <Wrapper
      padding={{
        group2: '0px',
        group3: '0px',
      }}
    >
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
        fade
        type="image"
      />
    </Wrapper>
  );
};

ImageContainer.propTypes = imageModelPropTypes;

ImageContainer.defaultProps = {
  position: [1],
};

export default ImageContainer;
