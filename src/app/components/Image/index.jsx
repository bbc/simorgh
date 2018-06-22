import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

// Filters array of blocks for a single block of given type
const filterForBlockType = (arrayOfBlocks, type) =>
  arrayOfBlocks.filter(block => block.type === type)[0];

const getText = ({ model }) => model.blocks[0].model.blocks[0].model.text;

const renderCaption = block => {
  if (!block) {
    return null;
  }
  const StyledFigCaption = styled.figcaption`
    background-color: #d5d0cd;
    color: #404040;
    font-family: ReithSans, Arial, Helvetica, freesans, sans-serif;
    padding: 8px;
  `;
  const caption = getText(block);

  return <StyledFigCaption>{caption}</StyledFigCaption>;
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

Image.propTypes = {
  model: propTypes.shape({
    blocks: propTypes.arrayOf(
      propTypes.shape({
        locator: propTypes.string,
      }),
    ),
  }),
};

Image.defaultProps = {
  model: {
    blocks: [
      {
        model: {},
      },
    ],
  },
};

export default Image;
