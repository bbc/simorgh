import React from 'react';
import { string, number } from 'prop-types';
import ImageWithPlaceholder from '#app/containers/ImageWithPlaceholder';
import StyledImage from './index.styles';

const Image = ({ src, altText, srcset, fallbackSrcset, width, height }) => {
  const RATIO = 56.25;
  return (
    <ImageWithPlaceholder
      src={src}
      alt={altText}
      srcset={srcset}
      fallbackSrcset={fallbackSrcset}
      ratio={RATIO}
      width={width}
      height={height}
      lazyload
      imageComponent={StyledImage}
    />
  );
};

Image.propTypes = {
  src: string.isRequired,
  altText: string.isRequired,
  width: number.isRequired,
  height: number.isRequired,
  srcset: string,
  fallbackSrcset: string,
};

Image.defaultProps = { srcset: '', fallbackSrcset: '' };

export default Image;
