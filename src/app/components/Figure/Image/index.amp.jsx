import React from 'react';
import { number, string } from 'prop-types';

const AmpImg = ({ alt, layout, src, srcset, height, width }) => {
  const props = {
    alt,
    layout,
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
  layout: string.isRequired,
  src: string.isRequired,
  srcset: string,
  height: number.isRequired,
  width: number.isRequired,
};

AmpImg.defaultProps = {
  srcset: null,
};

export default AmpImg;
