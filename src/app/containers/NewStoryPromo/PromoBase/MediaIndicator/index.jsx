import React from 'react';
import { node, string } from 'prop-types';
import { mediaIcons } from '#legacy/psammead-assets/src/svgs';
import MediaIndicatorWrapper from './index.styles';

const MediaIndicator = ({ children, mediaType }) => {
  return (
    <MediaIndicatorWrapper>
      {mediaIcons[mediaType]}
      {children}
    </MediaIndicatorWrapper>
  );
};

MediaIndicator.propTypes = {
  children: node.isRequired,
  mediaType: string.isRequired,
};

export default MediaIndicator;
