import React from 'react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import mostWatchedData from '#data/pidgin/mostWatched/index.json';
import { MEDIA_ASSET_PAGE } from '#app/routes/utils/pageTypes';
import MostWatchedContainer from '.';

const promos = mostWatchedData.records.slice(0, 5).map(item => item.promo);

const Component = () => {
  return (
    <RequestContextProvider
      bbcOrigin="https://www.test.bbc.co.uk"
      isAmp={false}
      pageType={MEDIA_ASSET_PAGE}
      pathname="/pidgin/tori-49450859"
      service="pidgin"
      statusCode={200}
    >
      <ToggleContextProvider
        toggles={{
          eventTracking: { enabled: false },
        }}
      >
        <MostWatchedContainer data={promos} />
      </ToggleContextProvider>
    </RequestContextProvider>
  );
};

export default {
  title: 'Containers/Most Watched',
  Component,
  parameters: { chromatic: { disable: true } },
};

export const MostWatched = Component;
