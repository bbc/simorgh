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
    props.srcset = srcset;
  }

  return <StyledImg {...props} />;
};

AmpImg.propTypes = {
  alt: string.isRequired,
  height: number.isRequired,
  src: string.isRequired,
  srcset: string,
  width: number.isRequired,
};

AmpImg.defaultProps = {
  srcset: null,
};

export default AmpImg;
