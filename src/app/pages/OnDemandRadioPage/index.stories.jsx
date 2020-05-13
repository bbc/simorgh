import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import { OnDemandRadioPage } from '..';
import indonesia from './fixtureData/indonesia';
import pashto from './fixtureData/pashto';
import WithTimeMachine from '#testHelpers/withTimeMachine';

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

const status = 200;

storiesOf('Pages|OnDemand Radio Page', module)
  .addDecorator(story => <WithTimeMachine>{story()}</WithTimeMachine>)
  .addDecorator(withKnobs)
  .addDecorator(
    withServicesKnob({
      defaultService: 'indonesia',
      services: Object.keys(onDemandRadioFixtures),
    }),
  )
  .add('default', ({ service }) => (
    <BrowserRouter>
      <OnDemandRadioPage
        match={matchFixtures(service)}
        pageData={onDemandRadioFixtures[service]}
        status={status}
        service={service}
        isAmp={false}
        loading={false}
        error=""
        pageType="media"
      />
    </BrowserRouter>
  ));
