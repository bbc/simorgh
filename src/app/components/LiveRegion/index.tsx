import React from 'react';
import VisuallyHiddenText from '../VisuallyHiddenText';
import { useLiveRegionContext } from './LiveRegionContext';

const LiveRegion = () => {
  const { liveRegionItem } = useLiveRegionContext();

  return (
    <VisuallyHiddenText aria-live="polite">{liveRegionItem}</VisuallyHiddenText>
  );
};

export default LiveRegion;
