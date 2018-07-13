import React from 'react';
import { filterForBlockType } from '../../helpers/blockHandlers';
import { imagePropTypes, imageDefaultPropTypes } from '../../models/proptypes';
import Caption from '../../components/Figure/Caption';

const getText = ({ model }) => model.blocks[0].model.blocks[0].model.text;

const renderCaption = block => {
  if (!block) {
    return null;
  }

  const caption = getText(block);

  return <Caption>{caption}</Caption>;
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
    <figure>
      <img alt={altText} src={rawImageSrc} />
      {renderCaption(captionBlock)}
    </figure>
  );
};

ImageContainer.propTypes = imagePropTypes;

ImageContainer.defaultProps = imageDefaultPropTypes;

export default ImageContainer;
