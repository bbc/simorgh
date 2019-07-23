import React, { useContext, Fragment } from 'react';
import { string, number, bool, node } from 'prop-types';
import LazyLoad from 'react-lazyload';
import ImagePlaceholder from '@bbc/psammead-image-placeholder';
import Image, { AmpImg } from '@bbc/psammead-image';
import { RequestContext } from '../../contexts/RequestContext';

const LAZYLOAD_OFFSET = 250; // amount of pixels below the viewport to begin loading the image

const renderImage = (imageToRender, lazyLoad) =>
  lazyLoad ? (
    <Fragment>
      <LazyLoad offset={LAZYLOAD_OFFSET} once>
        {imageToRender}
      </LazyLoad>
      <noscript>{imageToRender}</noscript>
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
  lazyLoad,
  ratio,
  src,
  sizes,
  srcset,
  width,
}) => {
  const { platform } = useContext(RequestContext);

  const imageToRender = (
    <Image
      alt={alt}
      src={src}
      sizes={sizes}
      width={width}
      srcset={srcset}
      fade={fade}
    />
  );

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
        renderImage(imageToRender, lazyLoad)
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
  lazyLoad: false,
  srcset: null,
  sizes: null,
};

export default ImageWithPlaceholder;
