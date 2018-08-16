import React from 'react';
import { filterForBlockType } from '../../helpers/blockHandlers';
import { imageModelPropTypes } from '../../models/propTypes/image';
import Figure from '../../components/Figure';
import { Img } from '../../components/Figure/Img';
import Caption from '../../components/Figure/Caption';

const getText = ({ model }) => model.blocks[0].model.blocks[0].model.text;

const ImageContainer = ({ blocks }) => {
  if (!blocks) {
    return null;
  }

  const rawImageBlock = filterForBlockType(blocks, 'rawImage');
  const altTextBlock = filterForBlockType(blocks, 'altText');
  const captionBlock = filterForBlockType(blocks, 'caption');

  if (!rawImageBlock || !altTextBlock) {
    return null;
  }

  const { locator } = rawImageBlock.model;
  const altText = getText(altTextBlock);
  const rawImageSrc = `https://ichef.bbci.co.uk/news/640${locator}`;
  const caption = captionBlock ? (
    <Caption>{getText(captionBlock)}</Caption>
  ) : null;

  return (
    <Figure>
      <Img src={rawImageSrc} alt={altText} />
      {caption}
    </Figure>
  );
};

ImageContainer.propTypes = imageModelPropTypes;

export default ImageContainer;
