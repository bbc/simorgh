import React from 'react';
import { filterForBlockType } from '../../helpers/blockHandlers';
import { emptyBlockArrayDefaultProps } from '../../models/propTypes';
import { imageModelPropTypes } from '../../models/propTypes/image';
import Figure from '../../components/Figure';

const getText = ({ model }) => model.blocks[0].model.blocks[0].model.text;

const getCaption = block => {
  if (!block) {
    return null;
  }
  return getText(block);
};

const ImageContainer = ({ blocks }) => {
  const rawImageBlock = filterForBlockType(blocks, 'rawImage');
  const altTextBlock = filterForBlockType(blocks, 'altText');
  const captionBlock = filterForBlockType(blocks, 'caption');

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

ImageContainer.propTypes = imageModelPropTypes;

ImageContainer.defaultProps = emptyBlockArrayDefaultProps;

export default ImageContainer;
