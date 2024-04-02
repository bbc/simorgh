import React from 'react';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import withServicesDecorator from '#storybook/withServicesDecorator';
import PodcastExternalLinkComponent from '.';

// eslint-disable-next-line react/prop-types
const Component = () => (
  <ToggleContextProvider
    toggles={{
      eventTracking: {
        enabled: false,
      },
    }}
  >
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
  </ToggleContextProvider>
);

export default {
  title: 'Containers/Podcast External Links',
  Component,
  parameters: { chromatic: { disable: true } },
  decorators: [withServicesDecorator()],
};

export const PodcastExternalLinks = Component;
