import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
import WithTimeMachine from '#testHelpers/withTimeMachine';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import RadioPageMain from '.';
import indonesia from '#data/indonesia/bbc_indonesian_radio/liveradio.json';
import korean from '#data/korean/bbc_korean_radio/liveradio.json';
import tigrinya from '#data/tigrinya/bbc_tigrinya_radio/liveradio.json';
import afaanoromoo from '#data/afaanoromoo/bbc_afaanoromoo_radio/liveradio.json';
import amharic from '#data/amharic/bbc_amharic_radio/liveradio.json';

// Not all services have fixtures for article data yet
// the service selector will be constrained to services that have article fixtures:
const liveRadioFixtures = {
  indonesia,
  korean,
  tigrinya,
  afaanoromoo,
  amharic,
};

const validServices = Object.keys(liveRadioFixtures);

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

storiesOf('Main|Radio Page', module)
  .addDecorator(story => <WithTimeMachine>{story()}</WithTimeMachine>)
  .addDecorator(withKnobs)
  .addDecorator(
    withServicesKnob({
      defaultService: 'indonesia',
      services: validServices,
    }),
  )
  .add('default', ({ service }) => {
    return (
      <ToggleContextProvider>
        <ServiceContextProvider service={service}>
          <RequestContextProvider
            isAmp={false}
            pageType="media"
            origin="https://www.bbc.com"
            service={service}
          >
            <BrowserRouter>
              <RadioPageMain
                pageData={liveRadioFixtures[service]}
                match={matchFixtures(service)}
                service={service}
              />
            </BrowserRouter>
          </RequestContextProvider>
        </ServiceContextProvider>
      </ToggleContextProvider>
    );
  });
