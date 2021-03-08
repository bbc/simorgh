import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob, themes } from '@bbc/psammead-storybook-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { afrique, pashto } from './fixtures';
import RecentVideoEpisodes from '.';

/* eslint-disable react/prop-types */
const RecentVideoEpisodesWithContext = ({ masterBrand, episodes, service }) => (
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

storiesOf('Containers/EpisodeList/RecentVideoEpisodes/LTR (afrique)', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob({ defaultService: 'afrique' }))
  .add(
    'multiple items',
    ({ service }) => {
      return (
        <RecentVideoEpisodesWithContext
          episodes={afrique}
          masterBrand={`bbc_${service}_tv`}
          service={service}
        />
      );
    },
    {
      options: {
        theme: themes.dark,
      },
    },
  )
  .add(
    'single item',
    ({ service }) => {
      return (
        <RecentVideoEpisodesWithContext
          episodes={[afrique[0]]}
          masterBrand={`bbc_${service}_tv`}
          service={service}
        />
      );
    },
    {
      options: {
        theme: themes.dark,
      },
    },
  );

storiesOf('Containers/EpisodeList/RecentVideoEpisodes/RTL (pashto)', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob({ defaultService: 'pashto' }))
  .add(
    'multiple items',
    ({ service }) => {
      return (
        <RecentVideoEpisodesWithContext
          episodes={pashto}
          masterBrand={`bbc_${service}_tv`}
          service={service}
        />
      );
    },
    {
      options: {
        theme: themes.dark,
      },
    },
  )
  .add(
    'single item',
    ({ service }) => {
      return (
        <RecentVideoEpisodesWithContext
          episodes={[pashto[0]]}
          masterBrand={`bbc_${service}_tv`}
          service={service}
        />
      );
    },
    {
      options: {
        theme: themes.dark,
      },
    },
  );
