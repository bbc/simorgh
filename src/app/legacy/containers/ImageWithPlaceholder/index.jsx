import React, { useContext, useState } from 'react';
import { useTheme } from '@emotion/react';
import { string, number, bool, node, elementType } from 'prop-types';
import styled from '@emotion/styled';
import LazyLoad from 'react-lazyload';
import ImagePlaceholder from '#psammead/psammead-image-placeholder/src';
import Image, { AmpImg } from '#psammead/psammead-image/src';
import { Helmet } from 'react-helmet';
import { RequestContext } from '#contexts/RequestContext';

const LAZYLOAD_OFFSET = 250; // amount of pixels below the viewport to begin loading the image

const StyledImage = styled(Image)`
  height: auto;
`;

const renderImage = (imageToRender, lazyLoad, fallback) =>
  lazyLoad ? (
    <>
      <LazyLoad offset={LAZYLOAD_OFFSET} once>
        {imageToRender}
      </LazyLoad>
      {fallback && <noscript>{imageToRender}</noscript>}
    </>
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
  preload,
  ratio,
  src,
  sizes,
  srcset,
  fallbackSrcset,
  primaryMimeType,
  fallbackMimeType,
  width,
  darkPlaceholder,
  imageComponent: ImageComponent,
}) => {
  const { isAmp } = useContext(RequestContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const imageProps = {
    alt,
    src,
    sizes,
    width,
    srcset,
    fallbackSrcset,
    primaryMimeType,
    fallbackMimeType,
    fade,
    height,
  };
  const imgType = src.split('.').pop();
  const imageToRender = (
    <ImageComponent onLoad={() => setIsLoaded(true)} {...imageProps} />
  );

  const isImgJpg = imgType === 'jpg' || imgType === 'jpeg';

  const {
    palette: { GHOST },
  } = useTheme();

  return (
    <>
      {preload && (
        <Helmet>
          <link
            rel="preload"
            as="image"
            href={src}
            imagesrcset={fallbackSrcset}
            imagesizes={sizes}
          />
        </Helmet>
      )}
      <ImagePlaceholder
        forwardStyle={isLoaded ? { background: 'none' } : null}
        ratio={ratio}
        darkPlaceholder={darkPlaceholder}
      >
        {isAmp ? (
          <AmpImg
            alt={alt}
            attribution={copyright || ''}
            layout="responsive"
            src={src}
            srcset={srcset}
            fallbackSrcset={fallbackSrcset}
            height={height}
            width={width}
            style={!isImgJpg ? { backgroundColor: GHOST } : null}
            {...(preload && { 'data-hero': true })}
          />
        ) : (
          renderImage(imageToRender, lazyLoad, fallback)
        )}
        {children}
      </ImagePlaceholder>
    </>
  );
};

ImageWithPlaceholder.propTypes = {
  alt: string.isRequired,
  copyright: string,
  children: node,
  darkPlaceholder: bool,
  height: number,
  fade: bool,
  fallback: bool,
  lazyLoad: bool,
  preload: bool,
  ratio: number.isRequired,
  src: string.isRequired,
  srcset: string,
  fallbackSrcset: string,
  primaryMimeType: string,
  fallbackMimeType: string,
  sizes: string,
  width: number.isRequired,
  imageComponent: elementType,
};

ImageWithPlaceholder.defaultProps = {
  copyright: null,
  children: null,
  darkPlaceholder: null,
  height: null,
  fade: false,
  fallback: true,
  lazyLoad: false,
  preload: false,
  srcset: null,
  fallbackSrcset: null,
  primaryMimeType: undefined,
  fallbackMimeType: undefined,
  sizes: null,
  imageComponent: StyledImage,
};

export default ImageWithPlaceholder;
