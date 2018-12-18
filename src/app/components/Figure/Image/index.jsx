import React from 'react';
import { number, string } from 'prop-types';
import StyledImg from './styledImg';

export { default as AmpImg } from './index.amp';

export const Img = ({ alt, height, src, width }) => (
  <StyledImg alt={alt} src={src} height={height} width={width} />
);

Img.propTypes = {
  alt: string.isRequired,
  height: number.isRequired,
  src: string.isRequired,
  width: number.isRequired,
};

const Image = Img;

export default Image;
