import { ToggleContextProvider } from '#contexts/ToggleContext';
import { ServiceContext } from '../../../contexts/ServiceContext';

import InlinePodcastPromo from './Inline';

const serviceContextMock = {
  dir: 'ltr',
  service: 'news',
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

const serviceContextMockElections = {
  ...serviceContextMock,
  podcastPromo: {
    ...serviceContextMock.podcastPromo,
    linkLabel: {
      ...serviceContextMock.podcastPromo.linkLabel,
      href: 'https://www.bbc.com/portuguese/articles/czd2prld130o',
    },
  },
};

const Component = ({ value = serviceContextMock }) => (
  <ToggleContextProvider
    toggles={{
      eventTracking: { enabled: true },
    }}
  >
    <ServiceContext.Provider value={value}>
      <InlinePodcastPromo />
    </ServiceContext.Provider>
  </ToggleContextProvider>
);

export default {
  title: 'Containers/Podcast Promo',
  Component,
};

export const InlinePromoGeneric = () => <Component />;
export const InlinePromoWhatsapp = () => (
  <Component value={serviceContextMockWhatsapp} />
);
export const InlinePromoYoutube = () => (
  <Component value={serviceContextMockYoutube} />
);
export const InlinePromoPodcast = () => (
  <Component value={serviceContextMockPodcast} />
);
export const InlinePromoElections = () => (
  <Component value={serviceContextMockElections} />
);
