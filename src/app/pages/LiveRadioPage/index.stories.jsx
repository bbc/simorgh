import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import WithTimeMachine from '#testHelpers/withTimeMachine';
import { MEDIA_PAGE } from '#app/routes/utils/pageTypes';
import { LiveRadioPage } from '..';
import indonesia from './fixtureData/indonesia';
import korean from './fixtureData/korean';
import tigrinya from './fixtureData/tigrinya';
import afaanoromoo from './fixtureData/afaanoromoo';
import amharic from './fixtureData/amharic';

const liveRadioFixtures = {
  indonesia,
  korean,
  tigrinya,
  afaanoromoo,
  amharic,
};

const matchFixtures = service => ({
  params: {
    mediaId: 'liveradio',
    serviceId: {
      indonesia: 'bbc_indonesian_radio',
      korean: 'bbc_korean_radio',
      tigrinya: 'bbc_tigrinya_radio',
      afaanoromoo: 'bbc_afaanoromoo_radio',
      amharic: 'bbc_amharic_radio',
    }[service],
  },
});

// eslint-disable-next-line react/prop-types
const Component = ({ service }) => (
  <BrowserRouter>
    <LiveRadioPage
      match={matchFixtures(service)}
      pageData={liveRadioFixtures[service]}
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
  title: 'Pages/Radio Page',
  decorators: [
    withKnobs,
    withServicesKnob({
      defaultService: 'indonesia',
      services: Object.keys(liveRadioFixtures),
    }),
    story => <WithTimeMachine>{story()}</WithTimeMachine>,
  ],
  parameters: {
    chromatic: {
      diffThreshold: 0.3,
      delay: 8000,
    },
  },
};

export const Page = Component;
