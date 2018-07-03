import React from 'react';
import { videoPropTypes, videoDefaultPropTypes } from '../../helpers/proptypes';
import { filterForBlockType } from '../../helpers/blockHandlers';

const Video = ({ model }) => {
  const subBlocks = model.blocks;

  const rawVideo = filterForBlockType(subBlocks, 'rawVideo');
  if (!rawVideo) {
    return null;
  }

  const { locator: videoLocator, duration, versionID, kind } = rawVideo.model;

  const imageBlock = filterForBlockType(subBlocks, 'image');

  if(!imageBlock){
    return null;
  }

  const rawImage = filterForBlockType(imageBlock.model.blocks, 'rawImage');

  if (!rawImage) {
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
