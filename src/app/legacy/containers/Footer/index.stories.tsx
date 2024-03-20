import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '../../psammead/psammead-storybook-helpers/src';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import Footer from '.';
import ThemeProvider from '../../../components/ThemeProvider';
import { StoryProps } from '../../../models/types/storybook';
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
  decorators: [withKnobs, withServicesKnob({ defaultService: 'pidgin' })],
  parameters: {
    chromatic: {
      viewports: [
        239, // Group 0
        399, // Group 1
        599, // Group 2
        899, // Group 3
        1007, // Group 4
        1280, // Group 5
      ],
    },
  },
};

export const Example = ({ service, variant }) => (
  <Component service={service} variant={variant} />
);

export const ExampleAMP = ({ service, variant }) => (
  <Component service={service} variant={variant} isAmp />
);

export const WithAdsEnabled = ({ service, variant }) => (
  <Component service={service} variant={variant} withAds />
);

export const HindiCollectiveNewsroomPublication = ({ variant }) => (
  <Component service="hindi" variant={variant} />
);
