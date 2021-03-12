import React from 'react';
import { storiesOf } from '@storybook/react';
import { latin } from '@bbc/gel-foundations/scripts';
import { ServiceContext } from '#contexts/ServiceContext';
import PodcastPromo from '.';

const serviceContextMock = {
  service: 'news',
  script: latin,
  podcastPromo: {
    title: 'Podcast',
    brandTitle: 'Sounds of the 90s with Fearne Cotton',
    brandDescription:
      'Join Fearne for a nostalgia drenched celebration of the best music and pop culture from the 90s.',
    image: {
      src: 'https://ichef.bbci.co.uk/images/ic/400x400/p098vtc3.jpg',
      alt: 'Picture of Spice Girls',
    },
    linkLabel: {
      href: 'https://www.bbc.co.uk/sounds/brand/m000gkf5',
      text: 'Episodes',
    },
  },
};

storiesOf('Containers/PodcastPromo', module).add('default', () => {
  return (
    <ServiceContext.Provider value={serviceContextMock}>
      <PodcastPromo />
    </ServiceContext.Provider>
  );
});
