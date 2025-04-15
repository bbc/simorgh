import React, { useContext } from 'react';
import { mediaIcons } from '#psammead/psammead-assets/src/svgs';
import { MediaIndicatorWrapper, MediaIndicatorAlignment } from './index.styles';
import PromoContext from '../PromoContext';

const MediaIndicator = ({ className = '' }) => {
  const { mediaType } = useContext(PromoContext);
  if (!mediaType) return null;
  return (
    <MediaIndicatorWrapper
      aria-hidden
      {...(className ? { className } : undefined)}
    >
      <MediaIndicatorAlignment>{mediaIcons[mediaType]}</MediaIndicatorAlignment>
    </MediaIndicatorWrapper>
  );
};

export default MediaIndicator;
