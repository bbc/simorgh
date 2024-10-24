import React from 'react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { afrique, pashto } from './fixtures';
import RecentVideoEpisodes from '.';

const Component = ({ masterBrand, episodes, service }) => (
  <RequestContextProvider
    service={service}
    pageType="media"
    pathname={`/${service}`}
    isAmp={false}
    // should amp come from context?
  >
    <ServiceContextProvider service={service}>
      <RecentVideoEpisodes masterBrand={masterBrand} episodes={episodes} />
    </ServiceContextProvider>
  </RequestContextProvider>
);

const fixtures = { afrique, pashto };

export default {
  title: 'Containers/Episode List/Video',
  Component,
  parameters: {
    backgrounds: {
      default: 'Dark',
      values: [{ name: 'Dark', value: '#141414' }],
    },
  },
};

export const MultipleItems = {
  render: (_, { service }) => (
    <Component
      episodes={fixtures?.[service] ?? fixtures.afrique}
      masterBrand={`bbc_${service}_tv`}
      service={service}
    />
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const SingleItem = {
  render: (_, { service }) => (
    <Component
      episodes={[fixtures?.[service]?.[0] ?? fixtures.afrique[0]]}
      masterBrand={`bbc_${service}_tv`}
      service={service}
    />
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

// This story is for chromatic testing purposes only
export const TestMultipleItems = storyArgs =>
  MultipleItems.render(storyArgs, { service: 'afrique' });
TestMultipleItems.tags = ['!dev'];

// This story is for chromatic testing purposes only
export const TestSingleItem = storyArgs =>
  SingleItem.render(storyArgs, { service: 'afrique' });
TestSingleItem.tags = ['!dev'];
