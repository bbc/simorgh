import React from 'react';
import Footer from '.';
import { StoryArgs, StoryProps } from '#models/types/storybook';
import { RequestContextProvider } from '#contexts/RequestContext';
import metadata from './metadata.json';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import ThemeProvider from '#components/ThemeProvider';

interface Props extends StoryProps {
  isAmp?: boolean;
  withAds?: boolean;
}

const Component = ({ service, isAmp = false, withAds = false }: Props) => (
  <RequestContextProvider
    isAmp={isAmp}
    isApp={false}
    pageType={undefined}
    pathname=""
    service={service}
    showAdsBasedOnLocation={withAds}
  >
    <ServiceContextProvider service={service}>
      <ThemeProvider service={service}>
        <Footer />
      </ThemeProvider>
    </ServiceContextProvider>
  </RequestContextProvider>
);

export default {
  title: 'Components/Footer',
  Component,
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
    metadata,
  },
};

export const Example = (_: StoryArgs, { service, variant }) => (
  <Component service={service} variant={variant} />
);

export const ExampleAMP = (_: StoryArgs, { service, variant }) => (
  <Component service={service} variant={variant} isAmp />
);

export const WithAdsEnabled = (_: StoryArgs, { service, variant }) => (
  <Component service={service} variant={variant} withAds />
);

export const HindiCollectiveNewsroomPublication = (
  _: StoryArgs,
  { variant },
) => <Component service="hindi" variant={variant} />;

export const SportWithoutTrustProjectLink = (_: StoryArgs, { variant }) => (
  <Component service="sport" variant={variant} />
);
