import React, { use } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import IMAGE from '../../../../components/Image';

const Image = ({
  src,
  altText,
  srcset = '',
  fallbackSrcset = '',
  width,
  height,
}) => {
  const { isAmp } = use(RequestContext);
  const ASPECT_RATIO = [16, 9];

  return (
    <IMAGE
      isAmp={isAmp}
      src={src}
      alt={altText}
      srcSet={srcset}
      fallbackSrcSet={fallbackSrcset}
      aspectRatio={ASPECT_RATIO}
      width={width}
      height={height}
      lazyLoad
    />
  );
};

export default Image;
