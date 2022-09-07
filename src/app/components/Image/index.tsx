/** @jsx jsx */
import { css, jsx, Theme } from '@emotion/react';
import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { createSrcsets } from '../../lib/utilities/srcSet';
import BASE64_PLACEHOLDER_IMAGE from '../Image/base64Placeholder';

interface Props {
  alt: string;
  src: string;
  originCode: string;
  originalImageWidth: number;
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
}: Props) => {
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
    <div
      className={className}
      css={{
        paddingBottom: `${(1 / wrapperAspectRatio) * 100}%`,
        position: 'relative',
        height: 0,
        overflow: 'hidden',
      }}
    >
      <div
        css={(theme: Theme) => [
          placeholder &&
            css({
              backgroundImage: `url(${BASE64_PLACEHOLDER_IMAGE})`,
              backgroundColor: theme.palette.LUNAR,
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '60px 17px',
              [theme.mq.GROUP_2_MIN_WIDTH]: {
                backgroundSize: '77px 22px',
              },
              [theme.mq.GROUP_4_MIN_WIDTH]: {
                backgroundSize: '93px 27px',
              },
            }),
          css({
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
          }),
        ]}
      >
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
              css={{ width: '100%', height: '100%' }}
            />
          </picture>
        )}
      </div>
    </div>
  );
};

export default Image;
