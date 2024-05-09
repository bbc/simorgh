import getPromo from './shared';

const PODCAST_FIXTURE = {
  title: 'Подкаст',
  brandTitle: 'Что это было?',
  brandDescription: 'Мы быстро, просто и понятно объясняем',
  image: {
    src: 'https://ichef.bbci.co.uk/images/ic/$recipe/p0776f5z.jpg',
    alt: 'Что это было?',
  },
  linkLabel: {
    text: 'эпизоды',
    href: 'https://www.bbc.com/russian/media-47937790',
  },
  skipLink: {
    text: 'Пропустить %title% и продолжить чтение.',
    endTextVisuallyHidden: 'Конец истории %title%',
  },
};

describe('getPromo', () => {
  it('should return promo details when podcast is available', () => {
    const expected = {
      podcastPromoTitle: 'Подкаст',
      podcastBrandTitle: 'Что это было?',
      description: 'Мы быстро, просто и понятно объясняем',
      imgSrc: 'https://ichef.bbci.co.uk/images/ic/512x512/p0776f5z.jpg.webp',
      alt: 'Что это было?',
      url: '/russian/media-47937790',
      label: 'эпизоды',
      showPromo: true,
      srcset:
        'https://ichef.bbci.co.uk/images/ic/128x128/p0776f5z.jpg 128w,https://ichef.bbci.co.uk/images/ic/240x240/p0776f5z.jpg 240w,https://ichef.bbci.co.uk/images/ic/480x480/p0776f5z.jpg 480w',
      sizes: '(min-width: 1008px) 228px, 30vw',
      primaryMimeType: 'image/jpeg',
      eventTrackingData: {
        componentName: 'promo-podcast',
      },
    };

    const actualPromo = getPromo(PODCAST_FIXTURE);

    expect(actualPromo).toEqual(expected);
  });

  it('should return empty object when promo is undefined', () => {
    const actualPromo = getPromo(undefined);
    expect(actualPromo).toEqual({});
  });
});
