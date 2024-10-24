import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MEDIA_PAGE } from '#app/routes/utils/pageTypes';
import { StoryArgs, StoryProps } from '#app/models/types/storybook';
import { Services } from '#app/models/types/global';
import { OnDemandAudioPage } from '..';
import indonesia from './fixtureData/indonesia.json';
import pashto from './fixtureData/pashto.json';

const onDemandRadioFixtures = {
  indonesia,
  pashto,
};

const matchFixtures = (service: Services) => ({
  params: {
    mediaId: 'liveradio',
    // @ts-expect-error partial data for testing
    serviceId: {
      indonesia: 'bbc_indonesian_radio',
      pashto: 'bbc_pashto_radio',
    }[service],
  },
});

const Component = ({ service }: StoryProps) => {
  return (
    <BrowserRouter>
      <OnDemandAudioPage
        match={matchFixtures(service)}
        // @ts-expect-error partial data for storybook
        pageData={onDemandRadioFixtures[service] || indonesia}
        status={200}
        service={service}
        loading={false}
        error=""
        pageType={MEDIA_PAGE}
      />
    </BrowserRouter>
  );
};

export default {
  Component,
  title: 'Pages/OnDemand Radio Page',
  parameters: {
    chromatic: {
      diffThreshold: 0.2,
    },
  },
};

export const Example = {
  render: (_: StoryArgs, { service, variant }: StoryProps) => (
    <Component service={service} variant={variant} />
  ),
  parameters: { chromatic: { disableSnapshot: true } },
};

// This story is for chromatic testing purposes only
export const Test = {
  render: (_: StoryArgs, { variant }: StoryProps) => (
    <Component service="indonesia" variant={variant} />
  ),
  tags: ['!dev'],
};
