/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/react';
import { Helmet } from 'react-helmet';
import { createSrcsets } from '../../lib/utilities/srcSet';
import styles from './index.styles';

interface Props {
  alt: string;
  src: string;
  originCode: string;
  imageResolutions: number[];
  sizes: string;
  width: number;
  height: number;
  className?: string;
  aspectRatio?: number;
  lazyLoad?: boolean;
  preload?: boolean;
  placeholder?: boolean;
  isAmp?: boolean;
}

const DEFAULT_ASPECT_RATIO = 16 / 9;

const Image = ({
  src,
  alt,
  originCode,
  imageResolutions,
  sizes = '100vw',
  width,
  height,
  aspectRatio,
  className,
  lazyLoad = false,
  preload = false,
  placeholder = true,
  isAmp = false,
}: React.PropsWithChildren<Props>) => {
  const wrapperAspectRatio =
    aspectRatio || width / height || DEFAULT_ASPECT_RATIO;
  const { primarySrcset, primaryMimeType, fallbackSrcset, fallbackMimeType } =
    createSrcsets({
      originCode,
      locator: src,
      originalImageWidth: width,
      imageResolutions,
    });

  return (
    <React.Fragment>
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
        css={[
          styles.wrapper,
          {
            paddingBottom: `${(1 / wrapperAspectRatio) * 100}%`,
          },
        ]}
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
                  type={primaryMimeType || 'image/webp'}
                  sizes={sizes}
                />
              )}
              {fallbackSrcset && (
                <source
                  srcSet={fallbackSrcset}
                  type={fallbackMimeType || 'image/jpeg'}
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
    </React.Fragment>
  );
};

export default Image;
