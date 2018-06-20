import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

const StyledFigCaption = styled.figcaption`
  background-color: #d5d0cd;
  color: #404040;
  font-family: ReithSans, Arial, Helvetica, freesans, sans-serif;
  padding: 8px;
`;

const getText = block => block.model.blocks[0].model.blocks[0].model.text;

const Image = props => {
  const subBlocks = props.model.blocks;

  const filterForBlock = (arrayOfBlocks, type) =>
    arrayOfBlocks.filter(block => block.type === type)[0];

  const rawImageBlock = filterForBlock(subBlocks, 'rawImage');
  const altTextBlock = filterForBlock(subBlocks, 'altText');
  const captionBlock = filterForBlock(subBlocks, 'caption');

  if (!rawImageBlock) {
    return null;
  }

  const rawImageLocator = rawImageBlock.model.locator;
  const altText = getText(altTextBlock);
  const caption = captionBlock ? getText(captionBlock) : null;
  const rawImageSrc = `https://ichef.bbci.co.uk/news/640${rawImageLocator}`;

  return (
    <figure>
      <img alt={altText} src={rawImageSrc} />
      {caption ? <StyledFigCaption>{caption}</StyledFigCaption> : null}
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
