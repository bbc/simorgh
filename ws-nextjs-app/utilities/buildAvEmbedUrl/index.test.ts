import buildAvEmbedURL from '.';

describe('buildAvEmbedURL', () => {
  it('should build an embed URL for the page', () => {
    expect(
      buildAvEmbedURL({
        assetId: 'srbija-68707945',
        mediaDelimiter: null,
        mediaId: null,
        service: 'serbian',
        variant: 'cyr',
      }),
    ).toEqual('https://www.bbc.com/serbian/cyr/av-embeds/srbija-68707945');
  });

  it('should build an embed with a vpid URL for the page', () => {
    expect(
      buildAvEmbedURL({
        assetId: 'srbija-68707945',
        mediaDelimiter: 'vpid',
        mediaId: 'p0cfmdwj',
        service: 'serbian',
        variant: 'cyr',
      }),
    ).toEqual(
      'https://www.bbc.com/serbian/cyr/av-embeds/srbija-68707945/vpid/p0cfmdwj',
    );
  });

  it('should build an embed with a pid URL for the page', () => {
    expect(
      buildAvEmbedURL({
        assetId: 'srbija-68707945',
        mediaDelimiter: 'pid',
        mediaId: 'p0cfmdwn',
        service: 'serbian',
        variant: 'cyr',
      }),
    ).toEqual(
      'https://www.bbc.com/serbian/cyr/av-embeds/srbija-68707945/pid/p0cfmdwn',
    );
  });
});
