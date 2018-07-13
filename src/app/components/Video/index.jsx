import React from 'react';
import { videoPropTypes, videoDefaultPropTypes } from '../../models/proptypes';

const Video = ({
  videoLocator,
  duration,
  rawImageSrc,
  versionID,
  imageLocator,
  kind,
}) => (
  <div>
    <div>
      video locator:
      {videoLocator}
    </div>
    <div>
      duration:
      {duration}
    </div>
    <div>
      raw Image Src:
      {rawImageSrc}
    </div>
    <div>
      versionID:
      {versionID}
    </div>
    <div>
      imageLocator:
      {imageLocator}
    </div>
    <div>
      kind:
      {kind}
    </div>
  </div>
);

Video.propTypes = videoPropTypes;

Video.defaultProps = videoDefaultPropTypes;

export default Video;
