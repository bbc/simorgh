import React from 'react';
import propTypes from 'prop-types';

const Headline = ({ model }) => {
  const { text } = model.blocks[0].model.blocks[0].model;

  return <h1>{text}</h1>;
};

Headline.propTypes = {
  model: propTypes.shape({
    blocks: propTypes.arrayOf(
      propTypes.shape({
        model: propTypes.shape({
          blocks: propTypes.arrayOf(
            propTypes.shape({
              text: propTypes.string,
            }),
          ),
        }),
      }),
    ),
  }),
};

Headline.defaultProps = {
  model: {
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
  },
};

export default Headline;
