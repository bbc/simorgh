import React from 'react';
import propTypes from 'prop-types';

const Video = ({ model }) => {
    let subBlocks = model.blocks;
    subBlocks = "Test";
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
