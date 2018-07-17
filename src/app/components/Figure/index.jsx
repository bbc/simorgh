import React from 'react';
import { string, shape } from 'prop-types';
import Caption from './Caption';
import Image from '../Image';

function renderCaption(caption) {
  return caption ? <Caption>{caption}</Caption> : null;
}

const Figure = ({ image, caption }) => (
  <figure>
    <Image {...image} />
    {renderCaption(caption)}
  </figure>
);

Figure.propTypes = {
  image: shape({
    alt: string.isRequired,
    src: string.isRequired,
  }).isRequired,
  caption: string,
};

Figure.defaultProps = {
  caption: null,
};

export default Figure;
