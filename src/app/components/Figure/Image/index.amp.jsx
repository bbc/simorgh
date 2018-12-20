import React from 'react';
import { number, string } from 'prop-types';

const AmpImg = ({ layout, alt, src, srcset, height, width }) => {
  const props = {
    layout,
    alt,
    src,
    height,
    width,
  };

  if (srcset) {
    props.srcSet = srcset;
  }

  return <amp-img {...props} />;
};

AmpImg.propTypes = {
  alt: string.isRequired,
  src: string.isRequired,
  srcset: string,
  height: number.isRequired,
  width: number.isRequired,
  layout: string.isRequired,
};

AmpImg.defaultProps = {
  srcset: null,
};

export default AmpImg;
