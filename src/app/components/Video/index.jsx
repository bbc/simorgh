import React from 'react';
import propTypes from 'prop-types';

const Video = ({ model }) => {
    const subBlocks = model.blocks;
    return (
      <div> 
        {' '}
        {subBlocks}
      </div>
    );
};

Video.propTypes = {
    model: propTypes.shape({
      blocks: propTypes.arrayOf(
        propTypes.shape({
          locator: propTypes.string,
        }),
      ),
    }),
  };
  
  Video.defaultProps = {
    model: {
      blocks: [
        {
          model: {},
        },
      ],
    },
  };

export default Video;
