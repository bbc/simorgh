import React, { useContext } from 'react';
import { mediaIcons } from '#psammead/psammead-assets/src/svgs';
import { string } from 'prop-types';
import { MediaIndicatorWrapper, MediaIndicatorAlignment } from './index.styles';
import PromoContext from '../PromoContext';

const MediaIndicator = ({ className }) => {
  const { mediaType } = useContext(PromoContext);
  if (!mediaType) return null;
  return (
    <MediaIndicatorWrapper aria-hidden className={className}>
      <MediaIndicatorAlignment>{mediaIcons[mediaType]}</MediaIndicatorAlignment>
    </MediaIndicatorWrapper>
  );
};

MediaIndicator.propTypes = {
  className: string,
};

MediaIndicator.defaultProps = { className: '' };

export default MediaIndicator;
