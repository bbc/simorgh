import React from 'react';
import { number, string } from 'prop-types';
import StyledImg from './styledImg';

export { default as AmpImg } from './index.amp';

export const Img = ({ alt, height, src, srcset, width }) => {
  const props = { alt, src, height, width };

  if (srcset) {
    props.srcSet = srcset;
  }

  return <StyledImg {...props} />;
};

Img.propTypes = {
  alt: string.isRequired,
  src: string.isRequired,
  srcset: string,
  height: number.isRequired,
  width: number.isRequired,
};

Img.defaultProps = {
  srcset: null,
};

export default Img;
