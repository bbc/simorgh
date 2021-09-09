import React from 'react';
import { shape, bool } from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import ImagePlaceholder from '@bbc/psammead-image-placeholder';
import ImageWithPlaceholder from '../../ImageWithPlaceholder';
import { createSrcset } from '#lib/utilities/srcSet';
import getOriginCode from '#lib/utilities/imageSrcHelpers/originCode';
import getLocator from '#lib/utilities/imageSrcHelpers/locator';

const RecommendationsImage = ({ item, lazyLoad }) => {
  const imageValues = pathOr(null, ['indexImage'], item);
  if (!imageValues) {
    const landscapeRatio = (9 / 16) * 100;
    return <ImagePlaceholder ratio={landscapeRatio} />;
  }

  const { height, width, path } = imageValues;

  const ratio = (height / width) * 100;
  const originCode = getOriginCode(path);
  const locator = getLocator(path);
  const imageResolutions = [70, 95, 144, 183, 240, 320, 660];
  const srcset = createSrcset(originCode, locator, width, imageResolutions);
  const sizes = '(max-width: 1008px) 33vw, 321px';
  const DEFAULT_IMAGE_RES = 660;
  const src = `https://ichef.bbci.co.uk/news/${DEFAULT_IMAGE_RES}${path}`;

  return (
    <ImageWithPlaceholder
      alt={imageValues.altText}
      ratio={ratio}
      src={src}
      fallback={false}
      {...imageValues}
      lazyLoad={lazyLoad}
      copyright={imageValues.copyrightHolder}
      srcset={srcset}
      sizes={sizes}
    />
  );
};

RecommendationsImage.propTypes = {
  useLargeImages: bool.isRequired,
  lazyLoad: bool,
  item: shape,
};

RecommendationsImage.defaultProps = {
  lazyLoad: false,
  item: shape({
    imageValues: shape({
      path: '',
      altText: '',
      height: '',
      width: '',
    }),
  }),
};

export default RecommendationsImage;
