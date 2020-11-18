import extractRecentEpisodes from '.';
import videoPageData from '#data/afrique/bbc_afrique_tv/tv_programmes/w13xttmz.json';
import audioPageData from '#data/indonesia/bbc_indonesian_radio/w13xtt0s.json';

describe('extractRecentEpisodes', () => {
  it.skip('should correctly format episodes', () => {
    expect(0).toEqual(1);
  });

  it('should correctly format TV episodes using a custom URL formatter', () => {
    expect(
      extractRecentEpisodes(videoPageData, {
        limit: 1,
        urlFormatter: (service, id) =>
          `/${service}/${id.split(':').pop().replace('/', '/tv/')}`,
      }),
    ).toEqual([
      {
        id: 'w172xc9xq2gllfk',
        url: '/afrique/bbc_afrique_tv/tv/w172xc9xq2gllfk',
        brandTitle: 'BBC Info',
        timestamp: 1605285900000,
        duration: 'PT15M',
        image: '//ichef.bbci.co.uk/images/ic/768x432/p08b22y1.png',
        altText: 'BBC Info',
      },
    ]);
  });

  it('should correctly format radio episodes', () => {
    expect(
      extractRecentEpisodes(audioPageData, {
        limit: 1,
      }),
    ).toEqual([
      {
        id: 'w172xnm8j4tz686',
        url: '/indonesia/bbc_indonesian_radio/w172xnm8j4tz686',
        brandTitle: 'Dunia Pagi Ini',
        timestamp: 1605564900000,
        duration: 'PT15M30S',
        image: '//ichef.bbci.co.uk/images/ic/768x432/p08b4828.png',
        altText: 'Dunia Pagi Ini',
      },
    ]);
  });

  it('should correctly output multiple episodes', () => {
    expect(
      extractRecentEpisodes(videoPageData, {
        limit: 3,
      }).length,
    ).toEqual(3);
  });

  it.skip('should correctly exclude episodes by id', () => {
    const episodeCountInPageData = 123; // TODO
    const firstId = 'w172xc9xq2gllfk'; // TODO
    expect(
      extractRecentEpisodes(videoPageData, {
        limit: episodeCountInPageData,
        exclude: firstId,
      }).length,
    ).toEqual(episodeCountInPageData - 1);
  });

  it.skip('should correctly pass through custom titles', () => {
    expect(0).toEqual(1);
  });
});
