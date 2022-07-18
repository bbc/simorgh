import React from 'react';
import { string } from 'prop-types';
import { mediaIcons } from '#legacy/psammead-assets/src/svgs';
import { MediaIndicatorWrapper, MediaIndicatorAlignment } from './index.styles';

const MediaIndicator = ({ mediaType }) => {
  if (!mediaType) return null;
  return (
    <MediaIndicatorWrapper aria-hidden>
      <MediaIndicatorAlignment>{mediaIcons[mediaType]}</MediaIndicatorAlignment>
    </MediaIndicatorWrapper>
  );
};

MediaIndicator.propTypes = {
  mediaType: string.isRequired,
};

export default MediaIndicator;
