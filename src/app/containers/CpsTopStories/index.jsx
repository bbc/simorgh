import React, { useContext } from 'react';

import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import { buildATIClickParams } from '#containers/ATIAnalytics/params';
import CpsTopStories from './CpsTopStories';
import EventTrackingContext from './EventTrackingContext';

const CpsTopStoriesWithEventTrackingContext = ({ pageData, ...rest }) => {
  let pageIdentifier;
  let platform;
  let statsDestination;
  const requestContext = useContext(RequestContext);
  const serviceContext = useContext(ServiceContext);
  const { service } = serviceContext;

  try {
    ({ pageIdentifier, platform, statsDestination } = buildATIClickParams(
      pageData,
      requestContext,
      serviceContext,
    ));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      `ATI Event Tracking Error: Could not parse tracking values from page data:\n${error.message}`,
    );
  }
  return (
    <EventTrackingContext.Provider
      value={{
        componentName: 'topStories',
        campaignName: 'sty',
        service,
        pageIdentifier,
        platform,
        statsDestination,
      }}
    >
      <CpsTopStories {...rest} />
    </EventTrackingContext.Provider>
  );
};

export default CpsTopStoriesWithEventTrackingContext;
