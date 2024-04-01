import React from 'react';
import { themes } from '#psammead/psammead-storybook-helpers/src';
import { RequestContextProvider } from '#contexts/RequestContext';
import { afrique, pashto } from './fixtures';
import RecentVideoEpisodes from '.';
import withServicesDecorator from '#app/utilities/withServicesDecorator';

/* eslint-disable react/prop-types */
const Component = ({ masterBrand, episodes, service }) => (
  <RequestContextProvider
    service={service}
    pageType="media"
    pathname={`/${service}`}
    isAmp={false}
    // should amp come from context?
  >
    <RecentVideoEpisodes masterBrand={masterBrand} episodes={episodes} />
  </RequestContextProvider>
);

const fixtures = { afrique, pashto };

export default {
  title: 'Containers/Episode List/Video',
  Component,
  decorators: [withServicesDecorator],
  parameters: {
    options: {
      theme: themes.dark,
    },
  },
};

export const MultipleItems = (_, { service }) => (
  <Component
    episodes={fixtures[service]}
    masterBrand={`bbc_${service}_tv`}
    service={service}
  />
);

export const SingleItem = (_, { service }) => (
  <Component
    episodes={[fixtures[service][0]]}
    masterBrand={`bbc_${service}_tv`}
    service={service}
  />
);
