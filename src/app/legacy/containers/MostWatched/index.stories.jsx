import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import mostWatchedData from '#data/pidgin/mostWatched/index.json';
import { MEDIA_ASSET_PAGE } from '#app/routes/utils/pageTypes';
import MostWatchedContainer from '.';
import ThemeProvider from '../../../components/ThemeProvider';

const promos = mostWatchedData.records.slice(0, 5).map(item => item.promo);

// eslint-disable-next-line react/prop-types
const Component = ({ service }) => {
  return (
    <ThemeProvider service={service}>
      <ServiceContextProvider service={service}>
        <RequestContextProvider
          bbcOrigin="https://www.test.bbc.co.uk"
          isAmp={false}
          pageType={MEDIA_ASSET_PAGE}
          pathname="/pidgin/tori-49450859"
          service="pidgin"
          statusCode={200}
        >
          <ToggleContextProvider
            toggles={{
              eventTracking: { enabled: false },
            }}
          >
            <MostWatchedContainer data={promos} />
          </ToggleContextProvider>
        </RequestContextProvider>
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

export default {
  title: 'Containers/Most Watched/Most Watched',
  Component,
  parameters: { chromatic: { disable: true } },
  decorators: [withKnobs, withServicesKnob({ defaultService: 'pidgin' })],
};

export const MostWatched = Component;
