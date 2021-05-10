import React from 'react';

import EventTrackingContextProvider from '#contexts/EventTrackingContext';
import CpsTopStories from './CpsTopStories';

const CpsTopStoriesWrapper = props => {
  const { pageData } = props;

  return (
    <EventTrackingContextProvider
      trackingData={{
        pageData,
        componentName: 'top-stories',
        campaignName: 'ws_oj',
        format: 'blah',
      }}
    >
      <CpsTopStories {...props} />
    </EventTrackingContextProvider>
  );
};

export default CpsTopStoriesWrapper;
