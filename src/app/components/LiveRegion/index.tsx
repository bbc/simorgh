import React from 'react';
import VisuallyHiddenText from '../VisuallyHiddenText';
import { useLiveRegionContext } from './LiveRegionContext';

const LiveRegion = () => {
  const { liveRegionItem } = useLiveRegionContext();

  if (liveRegionItem === undefined) {
    throw new Error(
      'You cannot render the LiveRegion component without having the LiveRegionContextProvider higher up in the component hierarchy, due to it relying on state declared in the provider',
    );
  }

  return (
    <VisuallyHiddenText aria-live="polite">{liveRegionItem}</VisuallyHiddenText>
  );
};

export default LiveRegion;
