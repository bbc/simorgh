import React from 'react';
import { string } from 'prop-types';
import Caption from './Caption';
import Image from '../Image';

function renderCaption(caption) {
  return caption ? <Caption>{caption}</Caption> : null;
}

const Figure = ({ alt, src, caption }) => (
  <figure>
    <Image alt={alt} src={src} />
    {renderCaption(caption)}
  </figure>
);

Figure.propTypes = {
  alt: string.isRequired,
  src: string.isRequired,
  caption: string,
};

Figure.defaultProps = {
  caption: null,
};

export default Figure;
