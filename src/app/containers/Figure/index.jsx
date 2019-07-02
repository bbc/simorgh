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

const Figure = ({
  ratio,
  alt,
  copyright,
  src,
  height,
  width,
  lazyLoad,
  children,
  srcset,
  fade,
}) => {
  const { platform } = useContext(RequestContext);

  const imageToRender = (
    <Image alt={alt} src={src} width={width} srcset={srcset} fade={fade} />
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

Figure.propTypes = {
  alt: string.isRequired,
  copyright: string,
  children: node,
  height: number,
  fade: bool,
  lazyLoad: bool,
  ratio: number.isRequired,
  src: string.isRequired,
  srcset: string,
  width: number.isRequired,
};

Figure.defaultProps = {
  copyright: null,
  children: null,
  height: null,
  fade: false,
  lazyLoad: false,
  srcset: null,
};

export default Figure;
