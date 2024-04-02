import React from 'react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import withServicesDecorator from '#storybook/withServicesDecorator';
import { indonesian, arabic } from './fixtures';
import RecentAudioEpisodes from './index';

/* eslint-disable react/prop-types */
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
      <RecentAudioEpisodes
        masterBrand={masterBrand}
        episodes={episodes}
        brandId={brandId}
        pageType={pageType}
      />
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
  decorators: [withServicesDecorator()],
};

export const MultipleItems = (_, { service }) => (
  <Component
    episodes={fixtures?.[service] ?? fixtures.indonesia}
    pageType="Podcast"
    masterBrand={masterBrands?.[service] ?? masterBrands.indonesia}
    service={service}
  />
);

export const SingleItem = (_, { service }) => {
  const fixture = fixtures?.[service]?.[0] ?? fixtures.indonesia[0];
  return (
    <Component
      episodes={[fixture]}
      pageType="Podcast"
      masterBrand={masterBrands?.[service] ?? masterBrands.indonesia}
      service={service}
    />
  );
};
