import React from 'react';
import propTypes from 'prop-types';

const Image = ({ blocks }) => {
  const rawImageLocator = blocks[0].model.blocks[0].model.locator;
  const rawImageSrc = `https://ichef.bbci.co.uk/news/640${rawImageLocator}`;

  if (!rawImageLocator) {
    return null;
  }

  return <img alt="" src={rawImageSrc} />;
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
