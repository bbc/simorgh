import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { indonesian, arabic } from './fixtures';
import RecentAudioEpisodes from './index';

/* eslint-disable react/prop-types */
const RecentAudioEpisodesWithContext = ({
  masterBrand,
  brandId,
  pageType,
  episodes,
  service,
}) => (
  <ServiceContextProvider service={service}>
    <RequestContextProvider
      service={service}
      pageType="media"
      pathname={`/${service}`}
      isAmp={false}
    >
      <RecentAudioEpisodes
        masterBrand={masterBrand}
        episodes={episodes}
        brandId={brandId}
        pageType={pageType}
      />
    </RequestContextProvider>
  </ServiceContextProvider>
);

storiesOf('Containers/EpisodeList/RecentAudioEpisodes/LTR (indonesian)', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob({ defaultService: 'indonesia' }))
  .add('multiple items', ({ service }) => {
    return (
      <RecentAudioEpisodesWithContext
        episodes={indonesian}
        pageType="Podcast"
        masterBrand="bbc_indonesian_radio"
        service={service}
      />
    );
  })
  .add('single item', ({ service }) => {
    return (
      <RecentAudioEpisodesWithContext
        episodes={[indonesian[0]]}
        pageType="Podcast"
        masterBrand="bbc_indonesian_radio"
        service={service}
      />
    );
  });

storiesOf('Containers/EpisodeList/RecentAudioEpisodes/RTL (arabic)', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob({ defaultService: 'arabic' }))
  .add('multiple items', ({ service }) => {
    return (
      <RecentAudioEpisodesWithContext
        episodes={arabic}
        pageType="Podcast"
        masterBrand="bbc_indonesian_radio"
        service={service}
      />
    );
  })
  .add('single item', ({ service }) => {
    return (
      <RecentAudioEpisodesWithContext
        episodes={[arabic[0]]}
        pageType="Podcast"
        masterBrand="bbc_indonesian_radio"
        service={service}
      />
    );
  });
