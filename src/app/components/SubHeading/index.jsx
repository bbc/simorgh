import React from 'react';
import propTypes from 'prop-types';

const SubHeading = ({ blocks }) => {
  const { text } = blocks[0].model.blocks[0].model;

  return (
    <h2>
      {text}
    </h2>
  );
};

SubHeading.propTypes = {
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
};

SubHeading.defaultProps = {
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

export default SubHeading;
