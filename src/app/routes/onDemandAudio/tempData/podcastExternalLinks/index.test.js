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
    const otherLinks = await getPodcastExternalLinks('hausa', 'bar');
    expect(otherLinks).toEqual([
      {
        linkText: 'RSS',
        linkUrl: 'https://podcasts.files.bbci.co.uk/bar.rss',
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
      },
    ];
    expect(links).toEqual(expectedLinks);
  });
});
