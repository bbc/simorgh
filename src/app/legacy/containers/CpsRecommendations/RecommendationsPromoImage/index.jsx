import React from 'react';
import ImagePlaceholder from '#psammead/psammead-image-placeholder/src';
import { createSrcsets } from '#lib/utilities/srcSet';
import buildIChefURL from '#lib/utilities/ichefURL';
import ImageWithPlaceholder from '../../ImageWithPlaceholder';

const RecommendationsImage = ({
  indexImage = {
    height: '',
    width: '',
    altText: '',
    copyrightHolder: '',
    originCode: '',
    locator: '',
  },
  lazyLoad = false,
}) => {
  if (!indexImage) {
    const landscapeRatio = (9 / 16) * 100;
    return <ImagePlaceholder ratio={landscapeRatio} />;
  }

  const { height, width, altText, copyrightHolder, originCode, locator } =
    indexImage;

  const ratio = (height / width) * 100;
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

export default RecommendationsImage;
