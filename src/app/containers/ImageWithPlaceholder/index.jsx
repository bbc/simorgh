import React, { useContext, Fragment } from 'react';
import { string, number, bool, node } from 'prop-types';
import LazyLoad from 'react-lazyload';
import ImagePlaceholder from '@bbc/psammead-image-placeholder';
import Image, { AmpImg } from '@bbc/psammead-image';
import { RequestContext } from '../../contexts/RequestContext';

const LAZYLOAD_OFFSET = 250; // amount of pixels below the viewport to begin loading the image

const renderImage = (imageToRender, lazyLoad, fallback) =>
  lazyLoad ? (
    <Fragment>
      <LazyLoad offset={LAZYLOAD_OFFSET} once>
        {imageToRender}
      </LazyLoad>
      {fallback && <noscript>{imageToRender}</noscript>}
    </Fragment>
  ) : (
    imageToRender
  );

const ImageWithPlaceholder = ({
  alt,
  children,
  copyright,
  fade,
  height,
  fallback, // only has an effect when lazyLoad == true
  lazyLoad,
  ratio,
  src,
  sizes,
  srcset,
  width,
}) => {
  const { platform } = useContext(RequestContext);

  const imageProps = { alt, src, sizes, width, srcset, fade };
  const imageToRender = <Image {...imageProps} />;

  return (
    <ImagePlaceholder ratio={ratio}>
      {platform === 'amp' ? (
        <AmpImg
          alt={alt}
          attribution={copyright || ''}
          layout="responsive"
          src={src}
          height={height}
          width={width}
        />
      ) : (
        renderImage(imageToRender, lazyLoad, fallback)
      )}
      {children}
    </ImagePlaceholder>
  );
};

ImageWithPlaceholder.propTypes = {
  alt: string.isRequired,
  copyright: string,
  children: node,
  height: number,
  fade: bool,
  fallback: bool,
  lazyLoad: bool,
  ratio: number.isRequired,
  src: string.isRequired,
  srcset: string,
  sizes: string,
  width: number.isRequired,
};

ImageWithPlaceholder.defaultProps = {
  copyright: null,
  children: null,
  height: null,
  fade: false,
  fallback: true,
  lazyLoad: false,
  srcset: null,
  sizes: null,
};

export default ImageWithPlaceholder;
