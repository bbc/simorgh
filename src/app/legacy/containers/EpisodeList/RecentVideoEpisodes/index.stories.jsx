import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import {
  withServicesKnob,
  themes,
} from '#psammead/psammead-storybook-helpers/src';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { afrique, pashto } from './fixtures';
import RecentVideoEpisodes from '.';

/* eslint-disable react/prop-types */
const Component = ({ masterBrand, episodes, service }) => (
  <ServiceContextProvider service={service}>
    <RequestContextProvider
      service={service}
      pageType="media"
      pathname={`/${service}`}
      isAmp={false}
      // should amp come from context?
    >
      <RecentVideoEpisodes masterBrand={masterBrand} episodes={episodes} />
    </RequestContextProvider>
  </ServiceContextProvider>
);

const fixtures = { afrique, pashto };

export default {
  title: 'Containers/Episode List/Video',
  Component,
  decorators: [
    withKnobs,
    withServicesKnob({
      defaultService: 'afrique',
      services: Object.keys(fixtures),
    }),
  ],
  parameters: {
    options: {
      theme: themes.dark,
    },
  },
};

export const MultipleItems = ({ service }) => (
  <Component
    episodes={fixtures[service]}
    masterBrand={`bbc_${service}_tv`}
    service={service}
  />
);

export const SingleItem = ({ service }) => (
  <Component
    episodes={[fixtures[service][0]]}
    masterBrand={`bbc_${service}_tv`}
    service={service}
  />
);
