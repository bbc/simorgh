import React from 'react';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
import PodcastExternalLinksComponent from '.';
import { ServiceContextProvider } from '#contexts/ServiceContext';

// eslint-disable-next-line react/prop-types
const Component = ({ service, variant }) => (
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
);

export default {
  title: 'Containers/Podcast External Links',
  Component,
  parameters: { chromatic: { disable: true } },
  decorators: [withKnobs, withServicesKnob()],
};

export const PodcastExternalLinks = Component;
