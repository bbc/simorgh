import React from 'react';
import { number, string } from 'prop-types';

const AmpImg = ({ alt, attribution, layout, src, srcset, height, width }) => {
  const props = {
    alt,
    attribution,
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
  attribution: string.isRequired,
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
