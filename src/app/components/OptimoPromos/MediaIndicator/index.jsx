import React from 'react';
import { string } from 'prop-types';
import { mediaIcons } from '#legacy/psammead-assets/src/svgs';
import {
  MediaIndicatorWrapper,
  MediaIndicatorFlexWrapper,
} from './index.styles';

const MediaIndicator = ({ type }) => {
  if (!type) return null;
  return (
    <MediaIndicatorWrapper aria-hidden>
      <MediaIndicatorFlexWrapper>{mediaIcons[type]}</MediaIndicatorFlexWrapper>
    </MediaIndicatorWrapper>
  );
};

MediaIndicator.propTypes = {
  type: string.isRequired,
};

export default MediaIndicator;
