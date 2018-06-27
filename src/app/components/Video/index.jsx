import React from 'react';
import { videoPropTypes, videoDefaultPropTypes } from '../../proptypes';
import filterForBlockType from '../../BlockHelpers/blockHelpers';

const Video = ({ model }) => {
  const subBlocks = model.blocks;

  // raw video block
  const rawVideo = filterForBlockType(subBlocks, 'rawVideo');
  if (!rawVideo) {
    return null;
  }

  const { locator: videoLocator, duration, versionID, kind } = rawVideo.model;

  // image blocks
  const imageBlock = filterForBlockType(subBlocks, 'image');
  const rawImage = filterForBlockType(imageBlock.model.blocks, 'rawImage');

  if (!rawVideo || !rawImage) {
    return null;
  }

  const { locator: imageLocator } = rawImage.model;
  const rawImageSrc = `https://ichef.bbci.co.uk/news/640${imageLocator}`;

  return (
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
};

Video.propTypes = videoPropTypes;

Video.defaultProps = videoDefaultPropTypes;

export default Video;
