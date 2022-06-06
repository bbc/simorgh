import React from 'react';
import { shape, bool } from 'prop-types';
import ImagePlaceholder from '#legacy/psammead-image-placeholder/src';
import { createSrcsets } from '#lib/utilities/srcSet';
import buildIChefURL from '#lib/utilities/ichefURL';
import getOriginCode from '#lib/utilities/imageSrcHelpers/originCode';
import getLocator from '#lib/utilities/imageSrcHelpers/locator';
import ImageWithPlaceholder from '../../ImageWithPlaceholder';

const RecommendationsImage = ({ indexImage, lazyLoad }) => {
  if (!indexImage) {
    const landscapeRatio = (9 / 16) * 100;
    return <ImagePlaceholder ratio={landscapeRatio} />;
  }

  const { height, width, path, altText, copyrightHolder } = indexImage;

  const ratio = (height / width) * 100;
  const originCode = getOriginCode(path);
  const locator = getLocator(path);
  const imageResolutions = [70, 95, 144, 183, 240, 320, 660];
  const { primarySrcset, primaryMimeType, fallbackSrcset, fallbackMimeType } =
    createSrcsets({
      originCode,
      locator,
      originalImageWidth: width,
      imageResolutions,
    });
  const DEFAULT_IMAGE_RES = 660;
  const src = buildIChefURL({
    originCode,
    locator,
    resolution: DEFAULT_IMAGE_RES,
  });

  return (
    <ImageWithPlaceholder
      alt={altText}
      ratio={ratio}
      src={src}
      fallback={false}
      {...indexImage}
      copyright={copyrightHolder}
      srcset={primarySrcset}
      fallbackSrcset={fallbackSrcset}
      primaryMimeType={primaryMimeType}
      fallbackMimeType={fallbackMimeType}
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
