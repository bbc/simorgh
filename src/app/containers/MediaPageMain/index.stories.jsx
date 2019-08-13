import React from 'react';
import { storiesOf } from '@storybook/react';
import { inputProvider } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { ToggleContextProvider } from '../../contexts/ToggleContext';
import { RequestContextProvider } from '../../contexts/RequestContext';

import MediaPageMain from '.';
import indonesia from '../../../../data/indonesia/bbc_indonesian_radio/liveradio.json';
import korean from '../../../../data/korean/bbc_korean_radio/liveradio.json';
import tigrinya from '../../../../data/tigrinya/bbc_tigrinya_radio/liveradio.json';
import afaanoromoo from '../../../../data/afaanoromoo/bbc_afaanoromo_radio/liveradio.json';
import amharic from '../../../../data/amharic/bbc_amharic_radio/liveradio.json';

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

storiesOf('Containers|Media', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    inputProvider(
      null,
      ({ service }) => {
        return (
          <ToggleContextProvider>
            <ServiceContextProvider service={service}>
              <RequestContextProvider
                isAmp={false}
                pageType="media"
                service={service}
              >
                <MediaPageMain
                  pageData={liveRadioFixtures[service]}
                  match={matchFixtures(service)}
                  service={service}
                />
              </RequestContextProvider>
            </ServiceContextProvider>
          </ToggleContextProvider>
        );
      },
      validServices,
      { defaultService: 'indonesia' },
    ),
  );
