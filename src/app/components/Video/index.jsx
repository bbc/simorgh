import React from 'react';
import { videoPropTypes , videoDefaultPropTypes } from '../../proptypes';

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

Video.propTypes = videoPropTypes
  
Video.defaultProps = videoDefaultPropTypes

export default Video;
