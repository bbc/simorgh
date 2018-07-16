import React from 'react';
import { imagePropTypes } from '../../models/proptypes';

const Image = props => {
  const { alt, src } = props;

  return <img alt={alt} src={src} />;
};

Image.propTypes = imagePropTypes;

export default Image;
