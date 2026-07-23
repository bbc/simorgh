import { OnDemandAudioBlock } from '#app/models/types/media';
import getOnDemandAudioLinkedData from './getOnDemandAudioLinkedData';

describe('getOnDemandAudioLinkedData', () => {
  it('emits a PodcastSeries as the main entity on a podcast brand page', () => {
    const canonicalNonUkLink = 'https://www.bbc.com/russian/podcasts/p076qqzl';
    const description =
      'Мы быстро, просто и понятно объясняем, что случилось, почему это важно и что будет дальше. Никаких ненужных подробностей и передергиваний - только факты и взвешенная аналитика.';

    const result = getOnDemandAudioLinkedData({
      pathname: '/russian/podcasts/p076qqzl',
      canonicalNonUkLink,
      serviceName: 'Russian',
      isPodcast: true,
      brandTitle: 'Что это было?',
      headline: 'Что это было? headline',
      summary: 'Чего Зеленский добился от Трампа?',
      brandLongSynopsis: description,
      thumbnailImageUrl:
        'https://ichef.bbci.co.uk/images/ic/1024x576/p0nxr60r.jpg',
      durationISO8601: 'PT20M40S',
      externalLinks: [
        {
          linkType: 'spotify',
          linkUrl: 'https://open.spotify.com/show/2CR7Wn6IzBVXPxQ5uzkkz1',
        },
        {
          linkType: 'apple',
          linkUrl:
            'https://podcasts.apple.com/ru/podcast/%D1%87%D1%82%D0%BE-%D1%8D%D1%82%D0%BE-%D0%B1%D1%8B%D0%BB%D0%BE/id1460240829?l=en',
        },
        { linkType: 'castbox', linkUrl: 'https://castbox.fm/vc/2092482' },
        {
          linkType: 'rss',
          linkUrl: 'https://podcasts.files.bbci.co.uk/p076qqzl.rss',
        },
      ],
    });

    expect(result.linkedDataEntities).toEqual([
      {
        '@type': 'PodcastSeries',
        '@id': `${canonicalNonUkLink}#series`,
        name: 'Что это было?',
        description,
        url: canonicalNonUkLink,
        image: {
          '@type': 'ImageObject',
          url: 'https://ichef.bbci.co.uk/images/ic/1024x576/p0nxr60r.jpg',
        },
        webFeed: 'https://podcasts.files.bbci.co.uk/p076qqzl.rss',
        sameAs: [
          'https://open.spotify.com/show/2CR7Wn6IzBVXPxQ5uzkkz1',
          'https://podcasts.apple.com/ru/podcast/%D1%87%D1%82%D0%BE-%D1%8D%D1%82%D0%BE-%D0%B1%D1%8B%D0%BB%D0%BE/id1460240829?l=en',
          'https://castbox.fm/vc/2092482',
        ],
      },
    ]);
  });

  it('emits PodcastSeries and PodcastEpisode on a podcast episode page', () => {
    const canonicalNonUkLink =
      'https://www.bbc.com/portuguese/podcasts/p09qw1cn/p0npghv8';
    const brandEntityId =
      'https://www.bbc.com/portuguese/podcasts/p09qw1cn#series';
    const episodeTitle =
      'Como Holanda se tornou terceiro maior exportador de alimentos do mundo apesar do território pequeno';
    const summary =
      'Reportagem mergulhou no ecossistema de inovação que permitiu que país do tamanho do Estado de Rio de Janeiro se tornasse 3º maior exportador de alimentos do mundo.';

    const result = getOnDemandAudioLinkedData({
      pathname: '/portuguese/podcasts/p09qw1cn/p0npghv8',
      canonicalNonUkLink,
      serviceName: 'News Brasil',
      isPodcast: true,
      mediaIsAvailable: true,
      brandTitle: 'BBC Lê',
      headline: 'BBC Lê headline',
      episodeTitle,
      summary,
      durationISO8601: 'PT16M4S',
      thumbnailImageUrl:
        'https://ichef.bbci.co.uk/images/ic/1024x576/p0npghyw.jpg',
      releaseDateTimeStamp: Date.parse('2026-06-23T00:00:00.000Z'),
      mediaBlocks: [
        {
          model: {
            versions: [
              { availableFrom: Date.parse('2026-06-23T10:00:00.000Z') },
            ],
          },
        },
      ] as unknown as OnDemandAudioBlock[],
      externalLinks: [
        {
          linkType: 'download',
          linkUrl:
            'https://open.live.bbc.co.uk/mediaselector/6/redir/version/2.0/mediaset/audio-nondrm-download-low/proto/https/vpid/p0npgh1h.mp3',
        },
      ],
    });

    expect(result.linkedDataEntities).toEqual([
      {
        '@type': 'PodcastSeries',
        '@id': brandEntityId,
        name: 'BBC Lê',
      },
      {
        '@type': 'PodcastEpisode',
        '@id': `${canonicalNonUkLink}#episode`,
        name: episodeTitle,
        description: summary,
        datePublished: '2026-06-23T00:00:00.000Z',
        partOfSeries: { '@id': brandEntityId },
        associatedMedia: {
          '@type': 'AudioObject',
          '@id': `${canonicalNonUkLink}#audio`,
          name: episodeTitle,
          description: summary,
          contentUrl:
            'https://open.live.bbc.co.uk/mediaselector/6/redir/version/2.0/mediaset/audio-nondrm-download-low/proto/https/vpid/p0npgh1h.mp3',
          encodingFormat: 'audio/mpeg',
          duration: 'PT16M4S',
          thumbnailUrl:
            'https://ichef.bbci.co.uk/images/ic/1024x576/p0npghyw.jpg',
          uploadDate: '2026-06-23T10:00:00.000Z',
        },
      },
    ]);
  });

  it('falls back to brandTitle and summary when promo titles and brand synopses are missing', () => {
    const canonicalNonUkLink = 'https://www.bbc.com/russian/podcasts/p076qqzl';

    const result = getOnDemandAudioLinkedData({
      pathname: '/russian/podcasts/p076qqzl',
      canonicalNonUkLink,
      serviceName: 'Russian',
      isPodcast: true,
      brandTitle: 'Что это было?',
      headline: 'Что это было? headline',
      summary: 'Чего Зеленский добился от Трампа?',
      thumbnailImageUrl:
        'https://ichef.bbci.co.uk/images/ic/1024x576/p0nxr60r.jpg',
      durationISO8601: 'PT20M40S',
    });

    expect(result.linkedDataEntities?.[0]).toEqual(
      expect.objectContaining({
        '@type': 'PodcastSeries',
        name: 'Что это было?',
        description: 'Чего Зеленский добился от Трампа?',
      }),
    );
  });
});
