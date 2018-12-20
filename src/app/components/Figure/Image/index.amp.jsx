import React from 'react';
import { number, string } from 'prop-types';
import StyledImg from './styledImg';

const AmpImg = ({ alt, height, src, srcset, width }) => {
  const props = {
    as: 'amp-img',
    layout: 'responsive',
    alt,
    src,
    height,
    width,
  };

  if (srcset) {
    props.srcSet = srcset;
  }

  return <StyledImg {...props} />;
};

AmpImg.propTypes = {
  alt: string.isRequired,
  src: string.isRequired,
  srcset: string,
  height: number.isRequired,
  width: number.isRequired,
};

AmpImg.defaultProps = {
  srcset: null,
};

export default AmpImg;
