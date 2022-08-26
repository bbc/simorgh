import { create } from '@storybook/theming';
import React from 'react';
import { createSrcsets } from '../../lib/utilities/srcSet';

interface Props {
  alt: string;
  src: string;
  locator: string;
  originCode: string;
  originalImageWidth: number;
  imageResolutions: number[];
  sizes: string;
}

const Image = ({
  src,
  alt,
  originCode,
  locator,
  originalImageWidth,
  imageResolutions,
  sizes = '100vw',
}: Props) => {
  const { primarySrcset, primaryMimeType, fallbackSrcset, fallbackMimeType } =
    createSrcsets({
      originCode,
      locator,
      originalImageWidth,
      imageResolutions,
    });

  return (
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
      <img src={src} alt={alt} />
    </picture>
  );
};

export default Image;
