import { use } from 'react';

import { mediaIcons } from '#psammead/psammead-assets/src/svgs';
import PromoContext from '../PromoContext';
import { MediaIndicatorAlignment, MediaIndicatorWrapper } from './index.styles';

const MediaIndicator = ({ className = '' }) => {
  const { mediaType } = use(PromoContext);
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
