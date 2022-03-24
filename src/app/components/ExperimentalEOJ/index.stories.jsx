/* eslint-disable react/prop-types */
import React from 'react';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import withOptimizelyProvider from '#containers/PageHandlers/withOptimizelyProvider';
import ScrollablePromo from '.';

const ScrollablePromoWithOptimizely = withOptimizelyProvider(ScrollablePromo);

const NEWS_FIXTURE = [
  {
    headlines: {
      headline:
        'Ashleigh Barty: World number one makes shock call to quit tennis',
    },
    locators: {
      assetUri: 'news/world-australia-60843870',
    },
  },
  {
    headlines: {
      headline: "Florida governor rejects transgender swimmer's win",
    },
    locators: {
      assetUri: '/mundo/noticias-america-latina-52884902',
    },
  },
  {
    headlines: {
      headline: 'Why are prices rising so quickly?',
    },
    locators: {
      assetUri: '/mundo/noticias-internacional-53113381',
    },
  },
];

const ScrollablePromoComponent = ({
  data,
  service,
  script,
  dir,
  translations,
}) => (
  <ToggleContextProvider>
    <ServiceContextProvider
      service={service}
      script={script}
      dir={dir}
      translations={translations}
    >
      <ScrollablePromoWithOptimizely blocks={data} />
    </ServiceContextProvider>
  </ToggleContextProvider>
);

export default {
  title: 'components/Experimental-Editorial-Onward-Journey',
  ScrollablePromoComponent,
  decorators: [withKnobs, withServicesKnob()],
};

export const Recommendations = props => (
  <ScrollablePromoComponent data={NEWS_FIXTURE} {...props} />
);
