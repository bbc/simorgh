import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import {
  withServicesKnob,
  buildRTLSubstories,
} from '@bbc/psammead-storybook-helpers';
import MostWatchedContainer from '.';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import mostWatchedData from '#data/pidgin/mostWatched/index.json';

const promos = mostWatchedData.records.slice(0, 5).map(item => item.promo);

const MOST_WATCHED_STORIES = 'Containers|Most Watched';
storiesOf(MOST_WATCHED_STORIES, module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob({ defaultService: 'pidgin' }))
  .addParameters({
    chromatic: { disable: true },
  })
  .add('default', ({ service }) => {
    return (
      <ServiceContextProvider service={service}>
        <RequestContextProvider
          bbcOrigin="https://www.test.bbc.co.uk"
          isAmp={false}
          pageType="MAP"
          pathname="/pidgin/tori-49450859"
          service="pidgin"
          statusCode={200}
        >
          <MostWatchedContainer data={promos} />
        </RequestContextProvider>
      </ServiceContextProvider>
    );
  });

buildRTLSubstories(MOST_WATCHED_STORIES);
