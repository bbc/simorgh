import React from 'react';
import { storiesOf } from '@storybook/react';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
import PodcastExternalLinks from '.';
import { ServiceContextProvider } from '#contexts/ServiceContext';

const links = [
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
];

storiesOf('Containers/Podcast', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add(`default`, ({ service, variant, pageLang }) => (
    <ServiceContextProvider
      service={service}
      variant={variant}
      pageLang={pageLang}
    >
      <PodcastExternalLinks links={links} lang={pageLang} />
    </ServiceContextProvider>
  ));
