import React from 'react';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import latin from '../../../components/ThemeProvider/fontScripts/latin';
import { ServiceContext } from '../../../contexts/ServiceContext';
import ThemeProvider from '../../../components/ThemeProvider';

import { InlinePodcastPromo, SecondaryColumnPodcastPromo } from '.';

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
    skipLink: {
      text: 'Skip %title% and continue reading',
      endTextVisuallyHidden: 'End of story %title%',
    },
  },
};

// eslint-disable-next-line react/prop-types
const Component = ({ inline = false }) => (
  <ThemeProvider service="news">
    <ToggleContextProvider
      toggles={{
        eventTracking: { enabled: true },
      }}
    >
      <ServiceContext.Provider value={serviceContextMock}>
        {inline ? <InlinePodcastPromo /> : <SecondaryColumnPodcastPromo />}
      </ServiceContext.Provider>
    </ToggleContextProvider>
  </ThemeProvider>
);

export default {
  title: 'Containers/Podcast Promo',
  Component,
};

export const SecondaryColumnPromo = () => <Component />;
export const InlinePromo = () => <Component inline />;
