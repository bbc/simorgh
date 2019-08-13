import React from 'react';
import { storiesOf } from '@storybook/react';
import { inputProvider } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';

import MediaPage from '.';
import indonesia from '../../../../data/indonesia/bbc_indonesian_radio/liveradio.json';
import korean from '../../../../data/korean/bbc_korean_radio/liveradio.json';
import tigrinya from '../../../../data/tigrinya/bbc_tigrinya_radio/liveradio.json';
import afaanoromoo from '../../../../data/afaanoromoo/bbc_afaanoromoo_radio/liveradio.json';
import amharic from '../../../../data/amharic/bbc_amharic_radio/liveradio.json';

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

storiesOf('Pages|Media Page', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    inputProvider(
      null,
      ({ service }) => (
        <MediaPage
          match={matchFixtures(service)}
          data={{
            pageData: liveRadioFixtures[service],
            status: 200,
          }}
          service={service}
          isAmp={false}
          loading={false}
          error=""
          pageType="media"
          dials={{ mpulse: false }}
        />
      ),
      Object.keys(liveRadioFixtures),
      { defaultService: 'indonesia' },
    ),
  );
