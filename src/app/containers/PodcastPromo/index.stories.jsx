import React from 'react';
import { latin } from '@bbc/gel-foundations/scripts';
import { ServiceContext } from '#contexts/ServiceContext';
import PodcastPromoComponent from '.';

const serviceContextMock = {
  service: 'news',
  script: latin,
  dir: 'ltr',
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

const Component = () => (
  <ServiceContext.Provider value={serviceContextMock}>
    <PodcastPromoComponent />
  </ServiceContext.Provider>
);

export default {
  title: 'Containers/Podcast Promo',
  Component,
};

export const PodcastPromo = Component;
