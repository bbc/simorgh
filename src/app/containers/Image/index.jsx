import React from 'react';
import { filterForBlockType } from '../../helpers/blockHandlers';
import { imageModelPropTypes } from '../../models/propTypes/image';
import Figure from '../Figure';

// TODO: this should be generalised to work for various products.
const DEFAULT_ICHEF_PRODUCT = 'news';
const DEFAULT_WIDTH = 640;
const ARRAY_OF_WIDTHS = ['270', '320', '480', '640', '900', '1024'];

const srcValue = (ichefProduct, width, originCode, locator) =>
  `https://ichef.bbci.co.uk/${ichefProduct}/${width}/${originCode}/${locator}`;

const srcsetValue = (ichefProduct, widths, originCode, locator) =>
  widths
    .map(
      width =>
        `https://ichef.bbci.co.uk/${ichefProduct}/${width}/${originCode}/${locator} ${width}w`,
    )
    .join(', ');

const getText = ({ model }) => model.blocks[0].model.blocks[0].model.text;

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
  const src = srcValue(
    DEFAULT_ICHEF_PRODUCT,
    DEFAULT_WIDTH,
    originCode,
    locator,
  );

  const srcset = srcsetValue(
    DEFAULT_ICHEF_PRODUCT,
    ARRAY_OF_WIDTHS,
    originCode,
    locator,
  );

  return (
    <Figure
      alt={altText}
      ratio={ratio}
      copyright={copyright}
      captionBlock={captionBlock}
      height={height}
      src={src}
      srcset={srcset}
      width={width}
    />
  );
};

ImageContainer.propTypes = imageModelPropTypes;

ImageContainer.defaultProps = {
  srcset: null,
};

export default ImageContainer;
