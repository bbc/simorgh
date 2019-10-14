import React from 'react';
import { storiesOf } from '@storybook/react';
import { inputProvider } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';

import RadioPage from '.';
import indonesia from '#data/indonesia/bbc_indonesian_radio/liveradio.json';
import korean from '#data/korean/bbc_korean_radio/liveradio.json';
import tigrinya from '#data/tigrinya/bbc_tigrinya_radio/liveradio.json';
import afaanoromoo from '#data/afaanoromoo/bbc_afaanoromoo_radio/liveradio.json';
import amharic from '#data/amharic/bbc_amharic_radio/liveradio.json';

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

const status = 200;

storiesOf('Pages|Radio Page', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    inputProvider({
      // eslint-disable-next-line react/prop-types
      componentFunction: ({ service }) => (
        <RadioPage
          match={matchFixtures(service)}
          pageData={liveRadioFixtures[service]}
          status={status}
          service={service}
          isAmp={false}
          loading={false}
          error=""
          pageType="media"
        />
      ),
      service: Object.keys(liveRadioFixtures),
      options: { defaultService: 'indonesia' },
    }),
  );
