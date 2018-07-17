import React from 'react';
import { imagePropTypes } from '../../models/proptypes';

const Image = ({ alt, src }) => <img alt={alt} src={src} />;

Image.propTypes = imagePropTypes;

export default Image;
