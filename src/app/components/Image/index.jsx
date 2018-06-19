import React from 'react';
import propTypes from 'prop-types';

const getText = block => block.model.blocks[0].model.blocks[0].model.text;

const Image = ({ blocks }) => {
  const subBlocks = blocks[0].model.blocks;
  const rawImageBlock = subBlocks.filter(block => block.type === 'rawImage')[0];
  const altTextBlock = subBlocks.filter(block => block.type === 'altText')[0];
  const captionBlock = subBlocks.filter(block => block.type === 'caption')[0];

  if (!rawImageBlock) {
    return null;
  }

  const rawImageLocator = rawImageBlock.model.locator;
  const altText = altTextBlock ? getText(altTextBlock) : '';
  const caption = captionBlock ? getText(captionBlock) : null;
  const rawImageSrc = `https://ichef.bbci.co.uk/news/640${rawImageLocator}`;

  return (
    <figure>
      <img alt={altText} src={rawImageSrc} />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
};

Image.propTypes = {
  blocks: propTypes.arrayOf(
    propTypes.shape({
      model: propTypes.shape({
        blocks: propTypes.arrayOf(
          propTypes.shape({
            locator: propTypes.string,
          }),
        ),
      }),
    }),
  ),
};

Image.defaultProps = {
  blocks: [
    {
      model: {
        blocks: [
          {
            model: {},
          },
        ],
      },
    },
  ],
};

export default Image;
