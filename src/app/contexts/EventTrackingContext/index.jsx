import React, { createContext } from 'react';

import useClickTracker from '#hooks/useClickTracker';
import useViewTracker from '#hooks/useViewTracker';

export const EventTrackingContext = createContext({});

const EventTrackingContextProvider = ({ trackingData, children }) => {
  const clickRef = useClickTracker(trackingData);
  const viewRef = useViewTracker(trackingData);

  return (
    <EventTrackingContext.Provider value={{ clickRef, viewRef }}>
      {children}
    </EventTrackingContext.Provider>
  );
};

export default EventTrackingContextProvider;
