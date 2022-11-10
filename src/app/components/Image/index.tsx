/** @jsx jsx */
/* @jsxFrag React.Fragment */
import React, { Fragment, PropsWithChildren, useState } from 'react';
import { Global, jsx } from '@emotion/react';
import { Helmet } from 'react-helmet';
import styles from './index.styles';

interface Props {
  alt: string;
  aspectRatio?: [x: number, y: number];
  attribution?: string;
  className?: string;
  fallbackMediaType?: string;
  fallbackSrcSet?: string;
  height?: number;
  isAmp?: boolean;
  lazyLoad?: boolean;
  placeholder?: boolean;
  preload?: boolean;
  mediaType?: string;
  srcSet?: string;
  sizes?: string;
  src: string;
  width?: number;
}

const DEFAULT_ASPECT_RATIO = [16, 9];
const roundNumber = (num: number) => Math.round(num * 100) / 100;
const getLegacyBrowserAspectRatio = (x: number, y: number) =>
  roundNumber((y / x) * 100)
    .toString()
    .concat('%');

const Image = ({
  alt,
  aspectRatio,
  attribution,
  className,
  fallbackMediaType,
  fallbackSrcSet,
  height,
  isAmp = false,
  lazyLoad = false,
  placeholder = true,
  preload = false,
  mediaType,
  srcSet,
  sizes,
  src,
  width,
}: PropsWithChildren<Props>) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const showPlaceholder = placeholder && !isLoaded;
  const hasDimensions = width && height;
  const [aspectRatioX, aspectRatioY] =
    (aspectRatio && aspectRatio) ||
    (hasDimensions && [width, height]) ||
    DEFAULT_ASPECT_RATIO;
  const legacyBrowserAspectRatio = getLegacyBrowserAspectRatio(
    aspectRatioX,
    aspectRatioY,
  );
  const hasFallback = srcSet && fallbackSrcSet;
  const ImageWrapper = hasFallback ? 'picture' : Fragment;
  const ampImgLayout = hasDimensions ? 'responsive' : 'fill';

  return (
    <>
      {preload && (
        <Helmet>
          <link
            rel="preload"
            as="image"
            href={src}
            imagesrcset={srcSet}
            imagesizes={sizes}
          />
        </Helmet>
      )}
      <div
        className={className}
        css={[styles.wrapper, showPlaceholder && styles.placeholder]}
        style={{
          paddingBottom: legacyBrowserAspectRatio,
        }}
      >
        {isAmp ? (
          <>
            {!hasDimensions && (
              // ensures amp-img will render when width and height is not provided
              // https://amp.dev/documentation/examples/style-layout/how_to_support_images_with_unknown_dimensions/
              <Global
                styles={{
                  '.bbc-image img': {
                    objectFit: 'cover',
                  },
                }}
              />
            )}
            <amp-img
              class="bbc-image"
              layout={ampImgLayout}
              alt={alt}
              src={src}
              width={width}
              height={height}
              srcSet={srcSet}
              sizes={srcSet ? sizes : undefined}
              attribution={attribution}
            >
              {fallbackSrcSet && (
                <amp-img
                  class="bbc-image"
                  layout={ampImgLayout}
                  alt={alt}
                  src={src}
                  width={width}
                  height={height}
                  srcSet={fallbackSrcSet}
                  sizes={sizes}
                  fallback=""
                  attribution={attribution}
                />
              )}
            </amp-img>
          </>
        ) : (
          <ImageWrapper>
            {hasFallback && (
              <>
                <source srcSet={srcSet} type={mediaType} sizes={sizes} />
                <source
                  srcSet={fallbackSrcSet}
                  type={fallbackMediaType}
                  sizes={sizes}
                />
              </>
            )}
            <img
              onLoad={() => setIsLoaded(true)}
              src={src}
              srcSet={!hasFallback ? srcSet : undefined}
              sizes={!hasFallback && srcSet ? sizes : undefined}
              alt={alt}
              loading={lazyLoad ? 'lazy' : undefined}
              width={width}
              height={height}
              css={styles.image}
              style={{ aspectRatio: `${aspectRatioX} / ${aspectRatioY}` }} // aspectRatio used in combination with the objectFit:cover will center the image horizontally and vertically if aspectRatio prop is different from image's intrinsic aspect ratio
            />
          </ImageWrapper>
        )}
      </div>
    </>
  );
};

export default Image;
