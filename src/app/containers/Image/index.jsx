import React from 'react';
import { filterForBlockType } from '../../helpers/blockHandlers';
import { imagePropTypes, imageDefaultPropTypes } from '../../models/proptypes';
import Figure from '../../components/Figure';

const getText = ({ model }) => model.blocks[0].model.blocks[0].model.text;

const getCaption = block => {
  if (!block) {
    return null;
  }
  return getText(block);
};

const ImageContainer = ({ model }) => {
  const subBlocks = model.blocks;

  const rawImageBlock = filterForBlockType(subBlocks, 'rawImage');
  const altTextBlock = filterForBlockType(subBlocks, 'altText');
  const captionBlock = filterForBlockType(subBlocks, 'caption');

  if (!rawImageBlock || !altTextBlock) {
    return null;
  }

  const { locator } = rawImageBlock.model;
  const altText = getText(altTextBlock);
  const rawImageSrc = `https://ichef.bbci.co.uk/news/640${locator}`;

  return (
    <Figure
      src={rawImageSrc}
      alt={altText}
      caption={getCaption(captionBlock)}
    />
  );
};

ImageContainer.propTypes = imagePropTypes;

ImageContainer.defaultProps = imageDefaultPropTypes;

export default ImageContainer;
