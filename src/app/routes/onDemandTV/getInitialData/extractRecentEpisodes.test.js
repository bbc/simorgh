import extractRecentEpisodes from './extractRecentEpisodes';
import pageData from '#data/afrique/bbc_afrique_tv/tv_programmes/w13xttmz.json';

describe('extractRecentEpisodes', () => {
  it('should correctly format episodes', () => {
    expect(
      extractRecentEpisodes(pageData, {
        limit: 1,
      }),
    ).toEqual([
      {
        id: 'w172xc9xq2gllfk',
        url: '/afrique/bbc_afrique_tv/tv/w172xc9xq2gllfk',
        brandTitle: 'BBC Info',
        date: '4 Avril 2020',
        duration: 'PT15M',
        image: '//ichef.bbci.co.uk/images/ic/768x432/p08b22y1.png',
        altText: 'BBC Info',
      },
    ]);
  });

  it.skip('should correctly output multiple episodes', () => {
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
});
