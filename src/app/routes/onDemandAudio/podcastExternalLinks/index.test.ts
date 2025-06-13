import getPodcastExternalLinks from '.';
import hausaExternalLinks from './hausa';
import zhongwenExternalLinks from './zhongwen';

describe('getPodcastExternalLinks', () => {
  it('should return the links', async () => {
    const links = await getPodcastExternalLinks({
      service: 'hausa',
      brandId: 'p08mlgcb',
      versionId: 'p0967t2j',
    });

    const expectedLinks = [
      ...hausaExternalLinks.p08mlgcb,
      {
        linkText: 'RSS',
        linkUrl: 'https://podcasts.files.bbci.co.uk/p08mlgcb.rss',
        linkType: 'rss',
      },
      {
        linkText: 'Download',
        linkUrl:
          'https://open.live.bbc.co.uk/mediaselector/6/redir/version/2.0/mediaset/audio-nondrm-download-low/proto/https/vpid/p0967t2j.mp3',
        linkType: 'download',
      },
    ];
    expect(links).toEqual(expectedLinks);
  });

  it('should return an empty array when service is incorrect', async () => {
    const links = await getPodcastExternalLinks({
      // @ts-expect-error partial data for testing purposes
      service: 'foo',
      brandId: 'p08mlgcb',
    });
    expect(links).toEqual([]);
  });

  it('should return an empty array if no configuration exists for that service', async () => {
    const links = await getPodcastExternalLinks({
      service: 'news',
      brandId: 'brandId',
      versionId: 'versionId',
    });
    expect(links).toEqual([]);
  });

  it('should return an empty array when brand is null', async () => {
    const links = await getPodcastExternalLinks({
      service: 'hausa',
      // @ts-expect-error partial data for testing purposes
      brandId: null,
    });
    expect(links).toEqual([]);
  });

  it('should return rss feed when brand is not found', async () => {
    const otherLinks = await getPodcastExternalLinks({
      service: 'hausa',
      brandId: 'bar',
      versionId: 'h455a',
    });
    expect(otherLinks).toEqual([
      {
        linkText: 'RSS',
        linkUrl: 'https://podcasts.files.bbci.co.uk/bar.rss',
        linkType: 'rss',
      },
      {
        linkText: 'Download',
        linkUrl:
          'https://open.live.bbc.co.uk/mediaselector/6/redir/version/2.0/mediaset/audio-nondrm-download-low/proto/https/vpid/h455a.mp3',
        linkType: 'download',
      },
    ]);
  });

  it('should return the links with variants', async () => {
    const links = await getPodcastExternalLinks({
      service: 'zhongwen',
      variant: 'simp',
      brandId: 'p02pc9xp',
      versionId: 'p0967t2j',
    });
    const expectedLinks = [
      ...zhongwenExternalLinks.simp.p02pc9xp,
      {
        linkText: 'RSS',
        linkUrl: 'https://podcasts.files.bbci.co.uk/p02pc9xp.rss',
        linkType: 'rss',
      },
      {
        linkText: 'Download',
        linkUrl:
          'https://open.live.bbc.co.uk/mediaselector/6/redir/version/2.0/mediaset/audio-nondrm-download-low/proto/https/vpid/p0967t2j.mp3',
        linkType: 'download',
      },
    ];
    expect(links).toEqual(expectedLinks);
  });

  it('should return the correct download link', async () => {
    const links = await getPodcastExternalLinks({
      service: 'burmese',
      brandId: 'p02pc9lh',
      versionId: 'p0967t2j',
    });
    expect(links[3].linkUrl).toEqual(
      'https://open.live.bbc.co.uk/mediaselector/6/redir/version/2.0/mediaset/audio-nondrm-download-low/proto/https/vpid/p0967t2j.mp3',
    );
  });
});
