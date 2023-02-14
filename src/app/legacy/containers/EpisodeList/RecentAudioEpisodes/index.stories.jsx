import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { indonesian, arabic } from './fixtures';
import RecentAudioEpisodes from './index';
import ThemeProvider from '../../../../components/ThemeProvider';

/* eslint-disable react/prop-types */
const Component = ({ masterBrand, brandId, pageType, episodes, service }) => (
  <ThemeProvider service={service}>
    <ServiceContextProvider service={service}>
      <RequestContextProvider
        service={service}
        pageType="media"
        pathname={`/${service}`}
        isAmp={false}
      >
        <ToggleContextProvider
          toggles={{
            eventTracking: {
              enabled: false,
            },
          }}
        >
          <RecentAudioEpisodes
            masterBrand={masterBrand}
            episodes={episodes}
            brandId={brandId}
            pageType={pageType}
          />
        </ToggleContextProvider>
      </RequestContextProvider>
    </ServiceContextProvider>
  </ThemeProvider>
);

const fixtures = { indonesia: indonesian, arabic };
const masterBrands = {
  indonesia: 'bbc_indonesian_radio',
  arabic: 'bbc_arabic_radio',
};

export default {
  title: 'Containers/Episode List/Audio',
  Component,
  decorators: [
    withKnobs,
    withServicesKnob({
      defaultService: 'indonesia',
      services: Object.keys(fixtures),
    }),
  ],
};

export const MultipleItems = ({ service }) => (
  <Component
    episodes={fixtures[service]}
    pageType="Podcast"
    masterBrand={masterBrands[service]}
    service={service}
  />
);

export const SingleItem = ({ service }) => (
  <Component
    episodes={[fixtures[service][0]]}
    pageType="Podcast"
    masterBrand={masterBrands[service]}
    service={service}
  />
);
