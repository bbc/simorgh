import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import { OnDemandTvPage } from '..';
import afrique from './fixtureData/afrique';
import pashto from './fixtureData/pashto';
import WithTimeMachine from '#testHelpers/withTimeMachine';
import { MEDIA_PAGE } from '#app/routes/utils/pageTypes';

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

const status = 200;

storiesOf('Pages|OnDemand TV Page', module)
  .addDecorator(story => <WithTimeMachine>{story()}</WithTimeMachine>)
  .addDecorator(withKnobs)
  .addDecorator(
    withServicesKnob({
      defaultService: 'pashto',
      services: Object.keys(onDemandTvFixtures),
    }),
  )
  .add('default', ({ service }) => (
    <BrowserRouter>
      <OnDemandTvPage
        match={matchFixtures(service)}
        pageData={onDemandTvFixtures[service]}
        status={status}
        service={service}
        isAmp={false}
        loading={false}
        error=""
        pageType={MEDIA_PAGE}
      />
    </BrowserRouter>
  ));
