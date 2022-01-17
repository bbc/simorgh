import React, { useContext, useState } from 'react';
import { string, number, bool, node } from 'prop-types';
import styled from '@emotion/styled';
import LazyLoad from 'react-lazyload';
import ImagePlaceholder from '@bbc/psammead-image-placeholder';
import Image, { AmpImg } from '@bbc/psammead-image';
import { Helmet } from 'react-helmet';
import { C_GHOST } from '@bbc/psammead-styles/colours';
import { RequestContext } from '#contexts/RequestContext';

const LAZYLOAD_OFFSET = 250; // amount of pixels below the viewport to begin loading the image

const StyledImage = () => (
  <picture className="bbc-1sbld47-StyledPicture e1enwo3v1">
    <source
      srcSet="https://ichef.bbci.co.uk/news/70/cpsdevpb/C13C/test/_63486494_a77a56ca-be96-4113-84d0-d9be7f8ee6f9.jpg.webp 70w, https://ichef.bbci.co.uk/news/95/cpsdevpb/C13C/test/_63486494_a77a56ca-be96-4113-84d0-d9be7f8ee6f9.jpg.webp 95w, https://ichef.bbci.co.uk/news/144/cpsdevpb/C13C/test/_63486494_a77a56ca-be96-4113-84d0-d9be7f8ee6f9.jpg.webp 144w, https://ichef.bbci.co.uk/news/183/cpsdevpb/C13C/test/_63486494_a77a56ca-be96-4113-84d0-d9be7f8ee6f9.jpg.webp 183w, https://ichef.bbci.co.uk/news/240/cpsdevpb/C13C/test/_63486494_a77a56ca-be96-4113-84d0-d9be7f8ee6f9.jpg.webp 240w, https://ichef.bbci.co.uk/news/320/cpsdevpb/C13C/test/_63486494_a77a56ca-be96-4113-84d0-d9be7f8ee6f9.jpg.webp 320w, https://ichef.bbci.co.uk/news/660/cpsdevpb/C13C/test/_63486494_a77a56ca-be96-4113-84d0-d9be7f8ee6f9.jpg.webp 660w"
      type="image/webp"
    />
    <source
      srcSet="https://ichef.bbci.co.uk/news/70/cpsdevpb/C13C/test/_63486494_a77a56ca-be96-4113-84d0-d9be7f8ee6f9.jpg 70w, https://ichef.bbci.co.uk/news/95/cpsdevpb/C13C/test/_63486494_a77a56ca-be96-4113-84d0-d9be7f8ee6f9.jpg 95w, https://ichef.bbci.co.uk/news/144/cpsdevpb/C13C/test/_63486494_a77a56ca-be96-4113-84d0-d9be7f8ee6f9.jpg 144w, https://ichef.bbci.co.uk/news/183/cpsdevpb/C13C/test/_63486494_a77a56ca-be96-4113-84d0-d9be7f8ee6f9.jpg 183w, https://ichef.bbci.co.uk/news/240/cpsdevpb/C13C/test/_63486494_a77a56ca-be96-4113-84d0-d9be7f8ee6f9.jpg 240w, https://ichef.bbci.co.uk/news/320/cpsdevpb/C13C/test/_63486494_a77a56ca-be96-4113-84d0-d9be7f8ee6f9.jpg 320w, https://ichef.bbci.co.uk/news/660/cpsdevpb/C13C/test/_63486494_a77a56ca-be96-4113-84d0-d9be7f8ee6f9.jpg 660w"
      type="image/jpeg"
    />
    <img
      src="https://ichef.bbci.co.uk/news/660/cpsdevpb/C13C/test/_63486494_a77a56ca-be96-4113-84d0-d9be7f8ee6f9.jpg"
      alt="bbc"
      sizes="(max-width: 1008px) 33vw, 321px"
      width="660"
      height="371"
      className="eehpdyc0 bbc-15pa1ki-StyledImg-StyledImage e1enwo3v0"
    />
  </picture>
);

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
  darkMode,
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
  const imageToRender = <StyledImage onLoad={null} {...imageProps} />;
  const shouldPreload = !isAmp && preload;
  const isImgJpg = imgType === 'jpg' || imgType === 'jpeg';

  return (
    <>
      {shouldPreload && (
        <Helmet>
          <link
            rel="preload"
            as="image"
            href={src}
            imagesrcSet={srcset}
            imagesizes={sizes}
          />
        </Helmet>
      )}
      <ImagePlaceholder
        forwardStyle={isLoaded ? { background: 'none' } : null}
        ratio={ratio}
        darkMode={darkMode}
        onl
      >
        {isAmp ? (
          <AmpImg
            alt={alt}
            attribution={copyright || ''}
            layout="responsive"
            src={src}
            srcSet={srcset}
            fallbackSrcSet={fallbackSrcset}
            height={height}
            width={width}
            style={!isImgJpg ? { backgroundColor: C_GHOST } : null}
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
  darkMode: bool,
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
};

ImageWithPlaceholder.defaultProps = {
  copyright: null,
  children: null,
  darkMode: null,
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
};

export default ImageWithPlaceholder;
