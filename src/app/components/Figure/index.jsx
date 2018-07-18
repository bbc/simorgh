import React from 'react';
import { string } from 'prop-types';
import Caption from './Caption';

function renderCaption(caption) {
  return caption ? <Caption>{caption}</Caption> : null;
}

const Figure = ({ src, alt, caption }) => (
  <figure>
    <img src={src} alt={alt} />
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
