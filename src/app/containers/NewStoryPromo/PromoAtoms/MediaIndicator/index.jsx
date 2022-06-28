import React from 'react';
import { string } from 'prop-types';
import { mediaIcons } from '#legacy/psammead-assets/src/svgs';
import {
  MediaIndicatorWrapper,
  MediaIndicatorFlexWrapper,
} from './index.styles';

const MediaIndicator = ({ mediaType }) => {
  return (
    <MediaIndicatorWrapper>
      <MediaIndicatorFlexWrapper>
        {mediaIcons[mediaType]}
      </MediaIndicatorFlexWrapper>
    </MediaIndicatorWrapper>
  );
};

MediaIndicator.propTypes = {
  mediaType: string.isRequired,
};

export default MediaIndicator;
