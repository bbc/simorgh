import React from 'react';
import { storyItemImage } from '../../models/propTypes/storyItem';
import Figure from '../Figure';

const StoryPromoFigure = ({ path, altText, height, width }) => {
  if (!path || !altText || !width || !height) {
    return null;
  }

  const ratio = ((height / width) * 100).toFixed(4);

  return (
    <Figure
      alt={altText}
      ratio={ratio}
      src={`https://ichef.bbci.co.uk/news/660${path}`}
      height={height}
      width={width}
    />
  );
};

StoryPromoFigure.propTypes = storyItemImage;

export default StoryPromoFigure;
