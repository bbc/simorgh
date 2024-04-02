import React from 'react';
import withServicesDecorator from '../../../../../.storybook/withServicesDecorator';
import Footer from '.';
import { StoryProps } from '../../../models/types/storybook';
import { RequestContextProvider } from '../../../contexts/RequestContext';

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
    <Footer />
  </RequestContextProvider>
);

export default {
  title: 'New Components/Footer',
  Component,
  decorators: [withServicesDecorator],
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

export const Example = (_, { service, variant }) => (
  <Component service={service} variant={variant} />
);

export const ExampleAMP = (_, { service, variant }) => (
  <Component service={service} variant={variant} isAmp />
);

export const WithAdsEnabled = (_, { service, variant }) => (
  <Component service={service} variant={variant} withAds />
);

export const HindiCollectiveNewsroomPublication = (_, { variant }) => (
  <Component service="hindi" variant={variant} />
);

export const SportWithoutTrustProjectLink = (_, { variant }) => (
  <Component service="sport" variant={variant} />
);
