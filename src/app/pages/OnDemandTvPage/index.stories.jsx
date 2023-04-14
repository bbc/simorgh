import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import WithTimeMachine from '#testHelpers/withTimeMachine';
import { MEDIA_PAGE } from '#app/routes/utils/pageTypes';
import { OnDemandTvPage } from '..';
import afrique from './fixtureData/afrique';
import pashto from './fixtureData/pashto';

const onDemandTvFixtures = {
  pashto,
  afrique,
};

const matchFixtures = service => ({
  params: {
    serviceId: {
      afrique: 'bbc_afrique_tv',
      pashto: 'bbc_pashto_tv',
    }[service],
  },
});

// eslint-disable-next-line react/prop-types
const Component = ({ service }) => (
  <BrowserRouter>
    <OnDemandTvPage
      match={matchFixtures(service)}
      pageData={onDemandTvFixtures[service]}
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
  title: 'Pages/OnDemand TV Page',
  decorators: [
    withKnobs,
    withServicesKnob({
      defaultService: 'pashto',
      services: Object.keys(onDemandTvFixtures),
    }),
    story => <WithTimeMachine>{story()}</WithTimeMachine>,
  ],
};

export const Page = Component;
