import extractServiceFromUrl from '.';

describe('extractServiceFromUrl', () => {
  it('should return correct service for WS service URLs', () => {
    const testCases = [
      { url: 'http://localhost:7081/ws/languages', expected: 'ws' },
      {
        url: 'http://localhost:7080/pidgin/topics/c404v061z85t',
        expected: 'pidgin',
      },
      {
        url: 'http://localhost:7080/pidgin/popular/read',
        expected: 'pidgin',
      },
      { url: 'http://localhost:7080/pidgin', expected: 'pidgin' },
      { url: 'https://www.test.bbc.com/ws/languages', expected: 'ws' },
      { url: 'https://www.test.bbc.com/mundo', expected: 'mundo' },
      { url: 'https://www.bbc.com/ws/languages', expected: 'ws' },
      { url: 'https://www.bbc.com/mundo', expected: 'mundo' },
      { url: 'https://www.bbc.com/mundo.lite', expected: 'mundo' },
      { url: 'https://www.bbc.com/serbian/lat', expected: 'serbian' },
      { url: 'https://www.bbc.com/zhongwen/simp', expected: 'zhongwen' },
      {
        url: 'https://www.bbc.com/mundo/articles/cx2qdvwy882o.lite',
        expected: 'mundo',
      },
      {
        url: 'https://www.bbc.com/mundo/articles/cx2qdvwy882o.amp',
        expected: 'mundo',
      },
      { url: 'https://www.bbc.com/news', expected: 'news' },
      { url: 'https://www.bbc.com/sport', expected: 'sport' },
      {
        url: 'https://www.bbc.com/vietnamese/articles/cpgqngyexq7o',
        expected: 'vietnamese',
      },
      {
        url: 'https://www.bbc.com/serbian/articles/clyv4e16dn3o/lat',
        expected: 'serbian',
      },
      {
        url: 'https://www.bbc.com/zhongwen/articles/c3xd4x9prgyo/simp',
        expected: 'zhongwen',
      },
      {
        url: 'https://www.bbc.com/pidgin/live/world-60552331',
        expected: 'pidgin',
      },
      {
        url: 'https://www.bbc.com/serbian/live/c003pmmldygt/lat',
        expected: 'serbian',
      },
      {
        url: 'https://www.bbc.com/vietnamese/popular/read',
        expected: 'vietnamese',
      },
      {
        url: 'https://www.bbc.com/serbian/lat/popular/read',
        expected: 'serbian',
      },
      {
        url: 'https://www.bbc.com/vietnamese/topics/ckdxnx1x5rnt',
        expected: 'vietnamese',
      },
      {
        url: 'https://www.bbc.com/serbian/topics/c5wzvzzz5vrt/cyr',
        expected: 'serbian',
      },
      {
        url: 'https://www.bbc.com/mundo/send/u50853489',
        expected: 'mundo',
      },
      {
        url: 'https://www.bbc.com/serbian/send/u50853665',
        expected: 'serbian',
      },
      {
        url: 'https://www.bbc.com/swahili/bbc_swahili_radio/liveradio',
        expected: 'swahili',
      },
      {
        url: 'https://www.bbc.com/zhongwen/simp/bbc_cantonese_radio/w172xwswq9t42v6',
        expected: 'zhongwen',
      },
      {
        url: 'https://www.bbc.com/zhongwen/simp/podcasts/p02pc9xp',
        expected: 'zhongwen',
      },
      {
        url: 'https://www.bbc.com/zhongwen/simp/podcasts/p02pc9xp/p09kpm0x',
        expected: 'zhongwen',
      },
      {
        url: 'https://www.bbc.com/zhongwen/simp/bbc_cantonese_radio/programmes/p0340tsy',
        expected: 'zhongwen',
      },
      {
        url: 'https://www.bbc.com/afaanoromoo/bbc_afaanoromoo_radio/liveradio',
        expected: 'afaanoromoo',
      },
      {
        url: 'https://www.bbc.com/afrique/bbc_afrique_radio/programmes/p030s6dq',
        expected: 'afrique',
      },
      {
        url: 'https://www.bbc.com/afrique/bbc_afrique_radio/w172y1g3d9108lh',
        expected: 'afrique',
      },
      {
        url: 'https://www.bbc.com/afrique/bbc_afrique_tv/tv_programmes/w13xttmz',
        expected: 'afrique',
      },
      {
        url: 'https://www.bbc.com/afrique/bbc_afrique_tv/tv/w172xtjgc2szrpv',
        expected: 'afrique',
      },
      {
        url: 'https://www.bbc.com/uzbek/bbc_uzbek_tv/tv/w172xtx1tpwq8tz',
        expected: 'uzbek',
      },
      {
        url: 'https://www.bbc.com/uzbek/bbc_uzbek_tv/tv_programmes/w13xttqv',
        expected: 'uzbek',
      },
    ];

    testCases.forEach(({ url, expected }) => {
      expect(extractServiceFromUrl(url)).toBe(expected);
    });
  });

  it('should return null for non-WS services', () => {
    expect(extractServiceFromUrl('https://www.bbc.com/random')).toBeNull();
    expect(extractServiceFromUrl('https://www.example.com/test')).toBeNull();
    expect(extractServiceFromUrl('http://tinyurl.com/kafqwek')).toBeNull();
    expect(extractServiceFromUrl('http://tinyurl.com/kafqwek')).toBeNull();
    expect(
      extractServiceFromUrl('https://www.youtube.com/@BBCNews/videos'),
    ).toBeNull();
    expect(extractServiceFromUrl('')).toBeNull();
  });
});
