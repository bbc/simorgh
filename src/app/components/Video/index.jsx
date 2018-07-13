import React from 'react';
import { videoComponentPropTypes } from '../../models/proptypes';

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

Video.propTypes = videoComponentPropTypes;

Video.defaultProps = {
  videoLocator: 'video locator',
  duration: 'duration',
  rawImageSrc: 'raw image source',
  versionID: 'version id',
  imageLocator: 'image locator',
  kind: 'kind',
};

export default Video;
