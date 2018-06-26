import React from 'react';
import { videoPropTypes , videoDefaultPropTypes } from '../../proptypes';

const Video = ({ model }) => {
  // currenct placeholder proptypes
    const rawVideo  = model.blocks[0].model;

    const {locator, duration, isLive} = rawVideo;
    let liveString;
    if(isLive !== undefined){
      liveString = isLive.toString();
    }

    return (
      <div> 
        {' '}
        <div>
          {locator}
        </div>
        <div>
          {duration}
        </div>
        <div>
          {liveString}
        </div>
      </div>
    );
};

Video.propTypes = videoPropTypes
  
Video.defaultProps = videoDefaultPropTypes

export default Video;
