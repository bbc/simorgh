import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '../../psammead/psammead-storybook-helpers/src';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import Footer from '.';
import ThemeProvider from '../../../components/ThemeProvider';
import { StoryProps } from '../../../models/types/storybook';
import { customViewports } from '../../../../../.storybook/preview';
import { RequestContextProvider } from '../../../contexts/RequestContext';

interface Props extends StoryProps {
  isAmp?: boolean;
  withAds?: boolean;
}

const Component = ({
  service,
  variant,
  isAmp = false,
  withAds = false,
}: Props) => (
  <ThemeProvider service={service} variant={variant}>
    <RequestContextProvider
      isAmp={isAmp}
      isApp={false}
      pageType={undefined}
      pathname=""
      service={service}
      showAdsBasedOnLocation={withAds}
    >
      <ServiceContextProvider service={service} variant={variant}>
        <Footer />
      </ServiceContextProvider>
    </RequestContextProvider>
  </ThemeProvider>
);

export default {
  title: 'New Components/Footer',
  Component,
  decorators: [withKnobs, withServicesKnob()],
  parameters: {
    chromatic: {
      viewports: [...Object.entries(customViewports)],
    },
  },
};

export const Example = ({ service, variant }) => (
  <Component service={service} variant={variant} />
);

// eslint-disable-next-line camelcase
export const Example_AMP = ({ service, variant }) => (
  <Component service={service} variant={variant} isAmp />
);

export const WithAdsEnabled = ({ service, variant }) => (
  <Component service={service} variant={variant} withAds />
);

export const HindiCollectiveNewsroomPublication = ({ variant }) => (
  <Component service="hindi" variant={variant} />
);
