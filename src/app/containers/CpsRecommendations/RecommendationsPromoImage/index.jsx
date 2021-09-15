import React from 'react';
import { shape, bool } from 'prop-types';
import ImagePlaceholder from '@bbc/psammead-image-placeholder';
import ImageWithPlaceholder from '../../ImageWithPlaceholder';
import { createSrcset } from '#lib/utilities/srcSet';
import getOriginCode from '#lib/utilities/imageSrcHelpers/originCode';
import getLocator from '#lib/utilities/imageSrcHelpers/locator';

const RecommendationsImage = ({ indexImage, lazyLoad }) => {
  if (!indexImage) {
    const landscapeRatio = (9 / 16) * 100;
    return <ImagePlaceholder ratio={landscapeRatio} />;
  }

  const { height, width, path } = indexImage;

  const ratio = (height / width) * 100;
  const originCode = getOriginCode(path);
  const locator = getLocator(path);
  const imageResolutions = [70, 95, 144, 183, 240, 320, 660];
  const srcset = createSrcset(originCode, locator, width, imageResolutions);
  const DEFAULT_IMAGE_RES = 660;
  const src = `https://ichef.bbci.co.uk/news/${DEFAULT_IMAGE_RES}${path}`;

  return (
    <ImageWithPlaceholder
      alt={indexImage.altText}
      ratio={ratio}
      src={src}
      fallback={false}
      {...indexImage}
      copyright={indexImage.copyrightHolder}
      srcset={srcset}
      lazyLoad={lazyLoad}
    />
  );
};

RecommendationsImage.propTypes = {
  lazyLoad: bool,
  indexImage: shape({}),
};

RecommendationsImage.defaultProps = {
  lazyLoad: false,
  indexImage: shape({
    path: '',
    altText: '',
    height: '',
    width: '',
  }),
};

export default RecommendationsImage;
