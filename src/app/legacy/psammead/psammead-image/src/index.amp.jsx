import React from 'react';
import omit from 'ramda/src/omit';
import { number, string } from 'prop-types';

// Prevents component outputting invalid HTML when styled with emotion
const omitInvalidProps = omit([
  'classname',
  'primaryMimeType',
  'fallbackMimeType',
]);

const AmpImg = props => {
  const { srcset, fallbackSrcset, ...otherProps } = props;

  return (
    <amp-img
      fallback=""
      srcSet={fallbackSrcset}
      {...omitInvalidProps(otherProps)}
    />
  );
};

AmpImg.propTypes = {
  alt: string.isRequired,
  attribution: string,
  height: number.isRequired,
  layout: string.isRequired,
  sizes: string,
  src: string.isRequired,
  srcset: string,
  fallbackSrcset: string,
  width: number.isRequired,
};

AmpImg.defaultProps = {
  attribution: '',
  sizes: null,
  srcset: null,
  fallbackSrcset: null,
};

export default AmpImg;
