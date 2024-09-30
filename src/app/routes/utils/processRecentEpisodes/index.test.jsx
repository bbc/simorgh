import assocPath from 'ramda/src/assocPath';
import videoPageData from '#data/afrique/bbc_afrique_tv/tv_programmes/w13xttmz.json';
import audioPageData from '#data/indonesia/bbc_indonesian_radio/w13xtt0s.json';
import processRecentEpisodes from '.';

describe('processRecentEpisodes', () => {
  it('should correctly format TV episodes using a custom URL formatter', () => {
    expect(
      processRecentEpisodes(videoPageData, {
        recentEpisodesLimit: 1,
        enabled: true,
        urlFormatter: (service, id) =>
          `/${service}/${id.split(':').pop().replace('/', '/tv/')}`,
      }),
    ).toEqual([
      {
        id: 'w172yj93rrkg6r7',
        brandTitle: 'BBC Info',
        episodeTitle: 'BBC Info',
        timestamp: 1679011200000,
        duration: 'PT15M',
        image: '//ichef.bbci.co.uk/images/ic/768x432/p08b22y1.png',
        altText: 'BBC Info',
      },
    ]);
  });

  it('should correctly format radio episodes', () => {
    expect(
      processRecentEpisodes(audioPageData, {
        recentEpisodesLimit: 1,
        enabled: true,
      }),
    ).toEqual([
      {
        id: 'w172ywztppckdp6',
        brandTitle: 'Dunia Pagi Ini',
        episodeTitle: 'Dunia Pagi Ini',
        timestamp: 1674345600000,
        duration: 'PT15M30S',
        image: '//ichef.bbci.co.uk/images/ic/768x432/p08b4828.png',
        altText: 'Dunia Pagi Ini',
      },
    ]);
  });

  it('should correctly output multiple episodes', () => {
    expect(
      processRecentEpisodes(videoPageData, {
        recentEpisodesLimit: 3,
        enabled: true,
      }).length,
    ).toEqual(3);
  });

  it('should correctly exclude episodes by id', () => {
    const episodeCountInPageData =
      videoPageData.relatedContent.groups[0].promos.length;
    const firstId = videoPageData.relatedContent.groups[0].promos[0].media.id;
    expect(
      processRecentEpisodes(videoPageData, {
        recentEpisodesLimit: episodeCountInPageData,
        exclude: firstId,
        enabled: true,
      }).length,
    ).toEqual(episodeCountInPageData - 1);
  });
});

it('should correctly handle episodes with missing versions', () => {
  const episodeCountInPageData =
    videoPageData.relatedContent.groups[0].promos.length;
  const pageWithMissingVersions = assocPath(
    ['relatedContent', 'groups', 0, 'promos', 0, 'media', 'versions'],
    [],
    videoPageData,
  );
  expect(
    processRecentEpisodes(pageWithMissingVersions, {
      recentEpisodesLimit: episodeCountInPageData,
      enabled: true,
    }).length,
  ).toEqual(episodeCountInPageData - 1);
});
