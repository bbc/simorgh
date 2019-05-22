import React, { useContext } from 'react';
import Image, { AmpImg } from '@bbc/psammead-image';
import ImagePlaceholder from '@bbc/psammead-image-placeholder';
import { storyItemImage } from '../../models/propTypes/storyItem';
import { RequestContext } from '../../contexts/RequestContext';

const StoryPromoFigure = ({
  path,
  altText,
  height,
  width,
  copyrightHolder,
}) => {
  const { platform } = useContext(RequestContext);
  if (!path || !altText || !width || !height) {
    return null;
  }

  const ratio = ((height / width) * 100).toFixed(4);
  const src = `https://ichef.bbci.co.uk/news/660${path}`;

  return (
    <ImagePlaceholder ratio={ratio}>
      {platform === 'amp' ? (
        <AmpImg
          alt={altText}
          attribution={copyrightHolder}
          layout="responsive"
          src={src}
          height={height}
          width={width}
        />
      ) : (
        <Image alt={altText} src={src} width={width} />
      )}
    </ImagePlaceholder>
  );
};

StoryPromoFigure.propTypes = storyItemImage;

export default StoryPromoFigure;
