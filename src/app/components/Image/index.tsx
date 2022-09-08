/** @jsx jsx */
/* @jsxFrag React.Fragment */
import React, { PropsWithChildren } from 'react';
import { jsx } from '@emotion/react';
import { Helmet } from 'react-helmet';
import styles from './index.styles';

interface Props {
  alt: string;
  aspectRatio?: number;
  className?: string;
  fallbackMediaType: string;
  fallbackSrcset: string;
  height: number;
  isAmp?: boolean;
  lazyLoad?: boolean;
  placeholder?: boolean;
  preload?: boolean;
  primaryMediaType: string;
  primarySrcset: string;
  sizes: string;
  src: string;
  width: number;
}

const DEFAULT_ASPECT_RATIO = 16 / 9;

const Image = ({
  alt,
  aspectRatio,
  className,
  fallbackMediaType,
  fallbackSrcset,
  height,
  isAmp = false,
  lazyLoad = false,
  placeholder = true,
  preload = false,
  primaryMediaType,
  primarySrcset,
  sizes = '100vw',
  src,
  width,
}: PropsWithChildren<Props>) => {
  const wrapperAspectRatio =
    aspectRatio || width / height || DEFAULT_ASPECT_RATIO;

  return (
    <>
      {preload && (
        <Helmet>
          <link
            rel="preload"
            as="image"
            href={src}
            imagesrcset={primarySrcset}
            imagesizes={sizes}
          />
        </Helmet>
      )}
      <div
        className={className}
        css={styles.wrapper}
        style={{
          paddingBottom: `${(1 / wrapperAspectRatio) * 100}%`,
        }}
      >
        <div
          css={[placeholder && styles.placeholder, styles.placeholderWrapper]}
        >
          {isAmp ? (
            <amp-img
              alt={alt}
              src={src}
              width={width}
              height={height}
              srcSet={primarySrcset}
              sizes={sizes}
            >
              {fallbackSrcset && (
                <amp-img
                  alt={alt}
                  src={src}
                  width={width}
                  height={height}
                  srcSet={fallbackSrcset}
                  sizes={sizes}
                  fallback=""
                />
              )}
            </amp-img>
          ) : (
            <picture>
              {primarySrcset && (
                <source
                  srcSet={primarySrcset}
                  type={primaryMediaType || 'image/webp'}
                  sizes={sizes}
                />
              )}
              {fallbackSrcset && (
                <source
                  srcSet={fallbackSrcset}
                  type={fallbackMediaType || 'image/jpeg'}
                  sizes={sizes}
                />
              )}
              <img
                src={src}
                alt={alt}
                loading={lazyLoad ? 'lazy' : undefined}
                width={width}
                height={height}
                css={styles.image}
              />
            </picture>
          )}
        </div>
      </div>
    </>
  );
};

export default Image;
