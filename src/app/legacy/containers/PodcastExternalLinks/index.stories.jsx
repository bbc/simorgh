import React from 'react';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import PodcastExternalLinkComponent from '.';
import ThemeProvider from '../../../components/ThemeProvider';

// eslint-disable-next-line react/prop-types
const Component = ({ service, variant }) => (
  <ThemeProvider service={service}>
    <ToggleContextProvider
      toggles={{
        eventTracking: {
          enabled: false,
        },
      }}
    >
      <ServiceContextProvider service={service} variant={variant}>
        <PodcastExternalLinkComponent
          links={[
            {
              linkUrl: 'https://bbc.com',
              linkText: 'Apple',
              linkType: 'apple',
            },
            {
              linkUrl: 'https://bbc.com',
              linkText: 'Google',
              linkType: 'google',
            },
            {
              linkUrl: 'https://bbc.com',
              linkText: 'Spotify',
              linkType: 'spotify',
            },
            {
              linkUrl: 'https://bbc.com',
              linkText: 'RSS',
              linkType: 'rss',
            },
            {
              linkUrl: 'https://bbc.com',
              linkText: 'Download',
              linkType: 'download',
            },
          ]}
        />
      </ServiceContextProvider>
    </ToggleContextProvider>
  </ThemeProvider>
);

export default {
  title: 'Containers/Podcast External Links/Podcast External Links',
  Component,
  parameters: { chromatic: { disable: true } },
  decorators: [withKnobs, withServicesKnob()],
};

export const PodcastExternalLinks = Component;
