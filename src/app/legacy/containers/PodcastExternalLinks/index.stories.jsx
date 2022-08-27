import React from 'react';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import PodcastExternalLinksComponent from '.';

// eslint-disable-next-line react/prop-types
const Component = ({ service, variant }) => (
  <ToggleContextProvider
    toggles={{
      eventTracking: {
        enabled: false,
      },
    }}
  >
    <ServiceContextProvider service={service} variant={variant}>
      <PodcastExternalLinksComponent
        links={[
          {
            linkUrl: 'https://bbc.com',
            linkText: 'Apple',
          },
          {
            linkUrl: 'https://bbc.com',
            linkText: 'Google',
          },
          {
            linkUrl: 'https://bbc.com',
            linkText: 'Spotify',
          },
          {
            linkUrl: 'https://bbc.com',
            linkText: 'RSS',
          },
        ]}
      />
    </ServiceContextProvider>
  </ToggleContextProvider>
);

export default {
  title: 'Containers/Podcast External Links',
  Component,
  parameters: { chromatic: { disable: true } },
  decorators: [withKnobs, withServicesKnob()],
};

export const PodcastExternalLinks = Component;
