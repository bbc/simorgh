/** @jsx jsx */
/* @jsxFrag React.Fragment */
import React, { Fragment, PropsWithChildren } from 'react';
import { jsx } from '@emotion/react';
import { Helmet } from 'react-helmet';
import styles from './index.styles';

interface Props {
  alt: string;
  aspectRatio?: number;
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

const DEFAULT_ASPECT_RATIO = 16 / 9;
const getAspectRatio = ({
  width,
  height,
}: {
  width?: number;
  height?: number;
}): number => {
  if (width && height) {
    return width / height;
  }

  return 0;
};
const roundNumber = (num: number) => Math.round(num * 100) / 100;

const Image = ({
  alt,
  aspectRatio,
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
  sizes = '100vw',
  src,
  width,
}: PropsWithChildren<Props>) => {
  const wrapperAspectRatio =
    aspectRatio || getAspectRatio({ width, height }) || DEFAULT_ASPECT_RATIO;
  const hasFallback = srcSet && fallbackSrcSet;
  const ImageWrapper = hasFallback ? 'picture' : Fragment;
  const ampImgLayout = width && height ? 'responsive' : 'fill';

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
        css={[styles.wrapper, placeholder && styles.placeholder]}
        style={{
          paddingBottom: `${roundNumber((1 / wrapperAspectRatio) * 100)}%`,
        }}
      >
        {isAmp ? (
          <amp-img
            layout={ampImgLayout}
            alt={alt}
            src={src}
            width={width}
            height={height}
            srcSet={srcSet}
            sizes={srcSet ? sizes : undefined}
          >
            {fallbackSrcSet && (
              <amp-img
                layout={ampImgLayout}
                alt={alt}
                src={src}
                width={width}
                height={height}
                srcSet={fallbackSrcSet}
                sizes={sizes}
                fallback=""
              />
            )}
          </amp-img>
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
              src={src}
              srcSet={!hasFallback ? srcSet : undefined}
              sizes={!hasFallback && srcSet ? sizes : undefined}
              alt={alt}
              loading={lazyLoad ? 'lazy' : undefined}
              width={width}
              height={height}
              css={styles.image}
            />
          </ImageWrapper>
        )}
      </div>
    </>
  );
};

export default Image;
