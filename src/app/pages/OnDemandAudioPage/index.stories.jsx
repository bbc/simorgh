import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import WithTimeMachine from '#testHelpers/withTimeMachine';
import { MEDIA_PAGE } from '#app/routes/utils/pageTypes';
import { OnDemandAudioPage } from '..';
import indonesia from './fixtureData/indonesia';
import pashto from './fixtureData/pashto';

const onDemandRadioFixtures = {
  indonesia,
  pashto,
};

const matchFixtures = service => ({
  params: {
    mediaId: 'liveradio',
    serviceId: {
      indonesia: 'bbc_indonesian_radio',
      pashto: 'bbc_pashto_radio',
    }[service],
  },
});

// eslint-disable-next-line react/prop-types
const Component = ({ service }) => (
  <BrowserRouter>
    <OnDemandAudioPage
      match={matchFixtures(service)}
      pageData={onDemandRadioFixtures[service]}
      status={200}
      service={service}
      isAmp={false}
      loading={false}
      error=""
      pageType={MEDIA_PAGE}
    />
  </BrowserRouter>
);

export default {
  Component,
  title: 'Pages/OnDemand Radio Page',
  decorators: [
    withKnobs,
    withServicesKnob({
      defaultService: 'indonesia',
      services: Object.keys(onDemandRadioFixtures),
    }),
    story => <WithTimeMachine>{story()}</WithTimeMachine>,
  ],
  parameters: {
    chromatic: {
      diffThreshold: 0.2,
    },
  },
};

export const Page = Component;
