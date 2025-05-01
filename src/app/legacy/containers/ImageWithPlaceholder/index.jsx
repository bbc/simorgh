import React, { useContext, useState } from 'react';
import { useTheme } from '@emotion/react';
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
  children = null,
  copyright = null,
  fade = false,
  height = null,
  fallback = true, // only has an effect when lazyLoad == true
  lazyLoad = false,
  preload = false,
  ratio,
  src,
  sizes = null,
  srcset = null,
  fallbackSrcset = null,
  primaryMimeType = undefined,
  fallbackMimeType = undefined,
  width,
  darkPlaceholder = null,
  imageComponent: ImageComponent = StyledImage,
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
            imageSrcSet={fallbackSrcset}
            imageSizes={sizes}
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

export default ImageWithPlaceholder;
