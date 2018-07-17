import React from 'react';
import { string } from 'prop-types';

const Image = ({ alt, src }) => <img alt={alt} src={src} />;

Image.propTypes = {
  alt: string.isRequired,
  src: string.isRequired,
};

export default Image;
