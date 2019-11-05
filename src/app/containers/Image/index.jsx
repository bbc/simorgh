import React from 'react';
import filterForBlockType from '#lib/utilities/blockHandlers';
import { imageModelPropTypes } from '#models/propTypes/image';
import ArticleFigure from '../ArticleFigure';
import Grid from '#app/components/Grid';
import createSrcset from './helpers/srcSet';
import getIChefURL from './helpers/ichefUrl';
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

const getRawImageSrc = (originCode, locator) =>
  originCode !== 'pips'
    ? getIChefURL(originCode, locator, DEFAULT_IMAGE_RES)
    : locator;

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
  const rawImageSrc = getRawImageSrc(originCode, locator);
  const srcSet = createSrcset(originCode, locator, width);
  const lazyLoad = shouldLazyLoad(position);

  let type = 'landscape';

  if (height === width) {
    type = 'square';
  }
  if (height > width) {
    type = 'portrait';
  }

  const layouts = {
    portrait: {
      group0: 6,
      group1: 6,
      group2: 6,
      group3: 5,
      group4: 5,
      group5: 10,
    },
    square: {
      group0: 6,
      group1: 6,
      group2: 6,
      group3: 5,
      group4: 5,
      group5: 10,
    },
    landscape: {
      group0: 6,
      group1: 6,
      group2: 6,
      group3: 5,
      group4: 5,
      group5: 10,
    },
  };

  const hasMargins = {
    landscape: false,
    square: true,
    portrait: true,
  };

  // This grid contain will be refactored in
  // https://github.com/bbc/simorgh/issues/1369
  // https://github.com/bbc/simorgh/issues/1319
  return (
    <Grid
      item
      startOffset={{
        group0: 1,
        group1: 1,
        group2: 1,
        group3: 1,
        group4: 2,
        group5: 5,
      }}
      columns={layouts[type]}
      enableNegativeGelMargins={!hasMargins[type]}
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
    </Grid>
  );
};

ImageContainer.propTypes = imageModelPropTypes;

ImageContainer.defaultProps = {
  position: [1],
};

export default ImageContainer;
