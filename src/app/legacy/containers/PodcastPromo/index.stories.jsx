import { ToggleContextProvider } from '#contexts/ToggleContext';
import latin from '../../../components/ThemeProvider/fontScripts/latin';
import { ServiceContext } from '../../../contexts/ServiceContext';

import InlinePodcastPromo from './Inline';
import SecondaryColumnPodcastPromo from './SecondaryColumn';

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

const serviceContextMockYoutube = {
  ...serviceContextMock,
  podcastPromo: {
    ...serviceContextMock.podcastPromo,
    linkLabel: {
      ...serviceContextMock.podcastPromo.linkLabel,
      href: 'https://www.youtube.com',
    },
  },
};

const serviceContextMockPodcast = {
  ...serviceContextMock,
  podcastPromo: {
    ...serviceContextMock.podcastPromo,
    linkLabel: {
      ...serviceContextMock.podcastPromo.linkLabel,
      href: 'https://www.bbc.co.uk/podcast',
    },
  },
};
const serviceContextMockWhatsapp = {
  ...serviceContextMock,
  podcastPromo: {
    ...serviceContextMock.podcastPromo,
    linkLabel: {
      ...serviceContextMock.podcastPromo.linkLabel,
      href: 'https://whatsapp',
    },
  },
};



const Component = ({ inline = false,  value = serviceContextMock }) => (
  <ToggleContextProvider
    toggles={{
      eventTracking: { enabled: true },
    }}
  >
    <ServiceContext.Provider value={value}>
      {inline ? <InlinePodcastPromo /> : <SecondaryColumnPodcastPromo />}
    </ServiceContext.Provider>
  </ToggleContextProvider>
);

export default {
  title: 'Containers/Podcast Promo',
  Component,
};

export const SecondaryColumnPromo = () => <Component />;
export const InlinePromoGeneric = () => <Component inline />;
export const InlinePromoWhatsapp = () => <Component inline value={serviceContextMockWhatsapp}/>;
export const InlinePromoYoutube = () => <Component inline value={serviceContextMockYoutube} />;
export const InlinePromoPodcast = () => <Component inline value={serviceContextMockPodcast} />;


