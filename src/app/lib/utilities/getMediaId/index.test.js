import getMediaId from '.';

describe('getMediaId', () => {
  const input = {
    assetId: 'liveradio',
    masterBrand: 'bbc',
    lang: 'ps',
    service: 'pashto',
  };

  it('should get media id for liveradio', () => {
    const mediaId = getMediaId(input);
    expect(mediaId).toBe('bbc/liveradio/ps');
  });

  it('should get media id for ondemand', () => {
    const mediaId = getMediaId({
      ...input,
      assetId: 'ondemand',
    });
    expect(mediaId).toBe('pashto/bbc/ondemand/ps');
  });
});
