import React from 'react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { indonesian, arabic } from './fixtures';
import RecentAudioEpisodes from './index';

const Component = ({ masterBrand, brandId, pageType, episodes, service }) => (
  <RequestContextProvider
    service={service}
    pageType="media"
    pathname={`/${service}`}
    isAmp={false}
  >
    <ToggleContextProvider
      toggles={{
        eventTracking: {
          enabled: false,
        },
      }}
    >
      <ServiceContextProvider service={service}>
        <RecentAudioEpisodes
          masterBrand={masterBrand}
          episodes={episodes}
          brandId={brandId}
          pageType={pageType}
        />
      </ServiceContextProvider>
    </ToggleContextProvider>
  </RequestContextProvider>
);

const fixtures = { indonesia: indonesian, arabic };
const masterBrands = {
  indonesia: 'bbc_indonesian_radio',
  arabic: 'bbc_arabic_radio',
};

export default {
  title: 'Containers/Episode List/Audio',
  Component,
};

export const MultipleItems = {
  render: (_, { service }) => (
    <Component
      episodes={fixtures?.[service] ?? fixtures.indonesia}
      pageType="Podcast"
      masterBrand={masterBrands?.[service] ?? masterBrands.indonesia}
      service={service}
    />
  ),
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const SingleItem = {
  render: (_, { service }) => (
    <Component
      episodes={[fixtures?.[service]?.[0] ?? fixtures.indonesia[0]]}
      pageType="Podcast"
      masterBrand={masterBrands?.[service] ?? masterBrands.indonesia}
      service={service}
    />
  ),
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

// This story is for chromatic testing purposes only
export const TestMultipleItems = storyArgs =>
  MultipleItems.render(storyArgs, { service: 'indonesia' });
TestMultipleItems.tags = ['!dev'];

// This story is for chromatic testing purposes only
export const TestSingleItem = storyArgs =>
  SingleItem.render(storyArgs, { service: 'indonesia' });
TestSingleItem.tags = ['!dev'];
