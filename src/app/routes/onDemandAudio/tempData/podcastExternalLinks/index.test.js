import { getPodcastExternalLinks } from '.';
import hausaExternalLinks from './hausa';
import zhongwenExternalLinks from './zhongwen';

describe('getPodcastExternalLinks', () => {
  it('should return the links', async () => {
    const links = await getPodcastExternalLinks('hausa', 'p08mlgcb');
    const expectedLinks = [
      ...hausaExternalLinks.default.p08mlgcb,
      {
        linkText: 'RSS',
        linkUrl: 'https://podcasts.files.bbci.co.uk/p08mlgcb.rss',
        linkType: 'rss',
      },
    ];
    expect(links).toEqual(expectedLinks);
  });

  it('should return an empty array when service is incorrect', async () => {
    const links = await getPodcastExternalLinks('foo', 'p08mlgcb');
    expect(links).toEqual([]);
  });

  it('should return an empty array when brand is null', async () => {
    const links = await getPodcastExternalLinks('hausa', null);
    expect(links).toEqual([]);
  });

  it('should return rss feed when brand is not found', async () => {
    const otherLinks = await getPodcastExternalLinks('hausa', 'bar', 'default');
    expect(otherLinks).toEqual([
      {
        linkText: 'RSS',
        linkUrl: 'https://podcasts.files.bbci.co.uk/bar.rss',
        linkType: 'rss',
      },
    ]);
  });

  it('should return the links with variants', async () => {
    const links = await getPodcastExternalLinks('zhongwen', 'p02pc9xp', 'simp');
    const expectedLinks = [
      ...zhongwenExternalLinks.simp.p02pc9xp,
      {
        linkText: 'RSS',
        linkUrl: 'https://podcasts.files.bbci.co.uk/p02pc9xp.rss',
        linkType: 'rss',
      },
    ];
    expect(links).toEqual(expectedLinks);
  });

  it('should return the correct download link', async () => {
    const links = await getPodcastExternalLinks(
      'burmese',
      'p02pc9lh',
      undefined,
      'p0967t2j',
    );
    expect(links[3].linkUrl).toEqual(
      'https://open.live.bbc.co.uk/mediaselector/6/redir/version/2.0/mediaset/audio-nondrm-download-low/proto/https/vpid/p0967t2j.mp3',
    );
  });
});
