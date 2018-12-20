import React from 'react';
import { number, string } from 'prop-types';
import styled from 'styled-components';

export { default as AmpImg } from './index.amp';

const StyledImg = styled.img`
  display: block;
  width: 100%;
`;

export const Img = ({ alt, src, srcset, height, width }) => {
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
