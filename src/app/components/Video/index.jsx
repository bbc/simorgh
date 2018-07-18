import React from 'react';
import { videoComponentPropTypes } from '../../models/propTypes';

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
  duration: 299,
  imageLocator: '/cpsprodpb/5BD5/production/_101690532_2.jpg',
  kind: 'clip',
  rawImageSrc: 'raw image source',
  versionID: 'p064nsz3',
  videoLocator: 'urn:bbc:pips:pid:p064nsyw',
};

export default Video;
