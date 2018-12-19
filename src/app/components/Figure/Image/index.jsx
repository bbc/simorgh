import React from 'react';
import { number, string } from 'prop-types';
import StyledImg from './styledImg';

export { default as AmpImg } from './index.amp';

export const Img = ({ alt, height, src, srcset, width }) => {
  const props = { alt, src, height, width };

  if (srcset) {
    props.srcset = srcset;
  }

  return <StyledImg {...props} />;
};

Img.propTypes = {
  alt: string.isRequired,
  height: number.isRequired,
  src: string.isRequired,
  srcset: string,
  width: number.isRequired,
};

Img.defaultProps = {
  srcset: null,
};

const Image = Img;

export default Image;
