import React from 'react';
import styled from 'styled-components';
import { imagePropTypes, imageDefaultPropTypes } from '../../proptypes';
import filterForBlockType from '../../../utils/blockHelpers';
import { FF_NEWS_SANS_REG } from '../../../lib/constants/styles';

const getText = ({ model }) => model.blocks[0].model.blocks[0].model.text;

const renderCaption = block => {
  if (!block) {
    return null;
  }
  const StyledFigCaption = styled.figcaption`
    background-color: #d5d0cd;
    color: #404040;
    font-family: ${FF_NEWS_SANS_REG};
    padding: 8px;
  `;
  const caption = getText(block);

  return (
    <StyledFigCaption>
      {caption}
    </StyledFigCaption>
  );
};

const Image = ({ model }) => {
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

Image.propTypes = imagePropTypes;

Image.defaultProps = imageDefaultPropTypes;

export default Image;
