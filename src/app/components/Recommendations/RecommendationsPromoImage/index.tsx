import React, { useContext } from 'react';
import { createSrcsets } from '#lib/utilities/srcSet';
import buildIChefURL from '#lib/utilities/ichefURL';
import Image from '#app/components/Image';
import { Recommendation } from '#models/types/onwardJourney';
import { RequestContext } from '#app/contexts/RequestContext';

const RecommendationsImage = ({
  image,
  lazyLoad = false,
}: {
  image: Recommendation['image'];
  lazyLoad?: boolean;
}) => {
  const { isAmp } = useContext(RequestContext);
  const { height, width, altText, copyrightHolder, originCode, locator } =
    image;

  const imageResolutions = [70, 95, 144, 183, 240, 320, 660];
  const { primarySrcset, fallbackSrcset } = createSrcsets({
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
    <Image
      isAmp={isAmp}
      alt={altText}
      aspectRatio={[width, height]}
      src={src}
      attribution={copyrightHolder}
      srcSet={primarySrcset}
      fallbackSrcSet={fallbackSrcset}
      lazyLoad={lazyLoad}
    />
  );
};

export default RecommendationsImage;
