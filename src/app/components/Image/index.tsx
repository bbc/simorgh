/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { createSrcsets } from '../../lib/utilities/srcSet';

interface Props {
  alt: string;
  src: string;
  originCode: string;
  originalImageWidth: number;
  imageResolutions: number[];
  sizes: string;
  lazyLoad?: boolean;
  preload?: boolean;
  placeholder?: boolean;
}

const Image = ({
  src,
  alt,
  originCode,
  originalImageWidth,
  imageResolutions,
  sizes = '100vw',
  lazyLoad = false,
  preload = false,
  placeholder = true,
}: Props) => {
  const { primarySrcset, primaryMimeType, fallbackSrcset, fallbackMimeType } =
    createSrcsets({
      originCode,
      locator: src,
      originalImageWidth,
      imageResolutions,
    });

  return (
    <div>
      <div>
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
        <picture css={{ paddingBottom: '56.25%', position: 'relative' }}>
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
            css={{
              backgroundColor: 'red',
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
            }}
          />
        </picture>
      </div>
    </div>
  );
};

export default Image;
