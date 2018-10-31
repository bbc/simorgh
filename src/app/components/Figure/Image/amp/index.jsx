import React from 'react';
import { string, number } from 'prop-types';

const AmpImage = ({ alt, src, ratio }) => (
  <amp-img alt={alt} src={src} height={ratio} width="100" layout="responsive"></amp-img> // eslint-disable-line react/self-closing-comp, prettier/prettier
);

AmpImage.propTypes = {
  alt: string.isRequired,
  src: string.isRequired,
  ratio: number.isRequired,
};

export default AmpImage;
