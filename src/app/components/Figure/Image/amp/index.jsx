import React from 'react';
import { string } from 'prop-types';

// @TODO - dynamic width & height
const AmpImage = ({ alt, src }) => (
  <amp-img alt={alt} src={src} layout="responsive" width="900" height="675"></amp-img> // eslint-disable-line react/self-closing-comp, prettier/prettier
);

AmpImage.propTypes = {
  alt: string.isRequired,
  src: string.isRequired,
};

export default AmpImage;
