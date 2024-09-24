import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MEDIA_PAGE } from '#app/routes/utils/pageTypes';
import withServicesDecorator from '#storybook/withServicesDecorator';
import { OnDemandAudioPage } from '..';
import indonesia from './fixtureData/indonesia.json';
import pashto from './fixtureData/pashto.json';

const onDemandRadioFixtures = {
  indonesia,
  pashto,
};

const matchFixtures = (service: 'indonesia' | 'pashto') => ({
  params: {
    mediaId: 'liveradio',
    serviceId: {
      indonesia: 'bbc_indonesian_radio',
      pashto: 'bbc_pashto_radio',
    }[service],
  },
});

const Component = (
  _: unknown,
  { service }: { service: 'indonesia' | 'pashto' },
) => {
  return (
    <BrowserRouter>
      <OnDemandAudioPage
        match={matchFixtures(service)}
        pageData={onDemandRadioFixtures[service]}
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
  decorators: [withServicesDecorator({ defaultService: 'indonesia' })],
  parameters: {
    chromatic: {
      diffThreshold: 0.2,
    },
  },
};

export const Page = Component;
