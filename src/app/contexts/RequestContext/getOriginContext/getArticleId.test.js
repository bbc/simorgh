import getArticleId from './getArticleId';

describe('getArticleId', () => {
  it('should find value in good data', () => {
    const goodData = {
      metadata: {
        id: 'optimo:urn:27873827',
      },
    };

    const optimoUrn = getArticleId(goodData);

    expect(optimoUrn).toEqual('27873827');
  });

  it('should return unknown in bad data', () => {
    const badData = {
      metadata: {
        invalidKey: 'optimo:urn:27873827',
      },
    };

    const optimoUrn = getArticleId(badData);

    expect(optimoUrn).toEqual(null);
  });
});
