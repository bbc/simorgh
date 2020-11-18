import extractRecentEpisodes from '.';
import pageData from '#data/afrique/bbc_afrique_tv/tv_programmes/w13xttmz.json';

describe('extractRecentEpisodes', () => {
  it.skip('should correctly format episodes', () => {
    expect(0).toEqual(1);
  });

  it('should correctly format TV episodes using a custom URL formatter', () => {
    expect(
      extractRecentEpisodes(pageData, {
        limit: 1,
        urlFormatter: (service, id) =>
          `/${service}/${id.split(':').pop().replace('/', '/tv/')}`,
      }),
    ).toEqual([
      {
        id: 'w172xc9xq2gllfk',
        url: '/afrique/bbc_afrique_tv/tv/w172xc9xq2gllfk',
        brandTitle: 'BBC Info',
        episodeTitle: '', // This asset does not have a custom title - we remove the ares fallback title
        timestamp: 1605285900000,
        duration: 'PT15M',
        image: '//ichef.bbci.co.uk/images/ic/768x432/p08b22y1.png',
        altText: 'BBC Info',
      },
    ]);
  });

  it('should correctly output multiple episodes', () => {
    expect(
      extractRecentEpisodes(pageData, {
        limit: 3,
      }).length,
    ).toEqual(3);
  });

  it.skip('should correctly exclude episodes by id', () => {
    const episodeCountInPageData = 123; // TODO
    const firstId = 'w172xc9xq2gllfk'; // TODO
    expect(
      extractRecentEpisodes(pageData, {
        limit: episodeCountInPageData,
        exclude: firstId,
      }).length,
    ).toEqual(episodeCountInPageData - 1);
  });

  it.skip('should correctly pass through custom titles', () => {
    expect(0).toEqual(1);
  });
});
