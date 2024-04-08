import React from 'react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import withServicesDecorator from '#storybook/withServicesDecorator';
import { afrique, pashto } from './fixtures';
import RecentVideoEpisodes from '.';

/* eslint-disable react/prop-types */
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
  decorators: [withServicesDecorator({ defaultService: 'afrique' })],
  parameters: {
    backgrounds: {
      default: 'Dark',
      values: [{ name: 'Dark', value: '#141414' }],
    },
  },
};

export const MultipleItems = (_, { service }) => (
  <Component
    episodes={fixtures?.[service] ?? fixtures.afrique}
    masterBrand={`bbc_${service}_tv`}
    service={service}
  />
);

export const SingleItem = (_, { service }) => {
  const fixture = fixtures?.[service]?.[0] ?? fixtures.afrique[0];
  return (
    <Component
      episodes={[fixture]}
      masterBrand={`bbc_${service}_tv`}
      service={service}
    />
  );
};
