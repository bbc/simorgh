import React from 'react';
import Caption from '../Caption';
import Image from '../Image';

function renderCaption(caption) {
  return caption ? <Caption>{caption}</Caption> : null;
}

const Figure = props => {
  const { alt, src, caption } = props; // eslint-disable-line 
  return (
    <figure>
      <Image alt={alt} src={src} />
      {renderCaption(caption)}
    </figure>
  );
};

export default Figure;
