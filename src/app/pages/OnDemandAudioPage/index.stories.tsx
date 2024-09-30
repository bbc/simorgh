import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MEDIA_PAGE } from '#app/routes/utils/pageTypes';
import withServicesDecorator from '#storybook/withServicesDecorator';
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

const Component = ({ service, text, longText }: StoryProps) => {
  // @ts-expect-error partial data for testing purposes
  let pageData = onDemandRadioFixtures[service];

  if (!pageData) {
    pageData = {
      ...indonesia,
      brandTitle: text,
      episodeTitle: '',
      summary: longText,
      imageUrl:
        'ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/36D1/production/_127933041__63970643_bbc-news-world-service-logo-nc.png',
    };
  }

  return (
    <BrowserRouter>
      <OnDemandAudioPage
        match={matchFixtures(service)}
        pageData={pageData}
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
  decorators: [withServicesDecorator()],
  parameters: {
    chromatic: {
      diffThreshold: 0.2,
    },
  },
};

export const Example = {
  render: (_: StoryArgs, { service, variant, text, longText }: StoryProps) => (
    <Component
      service={service}
      variant={variant}
      text={text}
      longText={longText}
    />
  ),
  parameters: { chromatic: { disableSnapshot: true } },
};

// This story is for chromatic testing purposes only
export const Test = {
  render: (_: StoryArgs, { variant }: StoryProps) => (
    <Component service="indonesia" variant={variant} />
  ),
  tags: ['test'],
};
