import React from 'react';
import styled from 'styled-components';
import { number, string } from 'prop-types';

export const StyledImg = styled.img`
  display: block;
  width: 100%;
`;

export const Img = ({ alt, height, src, width }) => (
  <StyledImg alt={alt} src={src} height={height} width={width} />
);

Img.propTypes = {
  alt: string.isRequired,
  height: number.isRequired,
  src: string.isRequired,
  width: number.isRequired,
};

// eslint-disable-next-line global-require
export const AmpImg = require('./index.amp');

const Image = Img;

export default Image;
