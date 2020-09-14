import getInitialData from '.';

describe('mostWatched - getInitialData', () => {
  it('should return status and metadata', async () => {
    const response = getInitialData({
      path: 'mock-frontpage-path',
      service: 'pidgin',
      pageType: 'mostWatched',
    });
    const expected = {
      status: 200,
      pageData: { metadata: { type: 'mostWatched' } },
    };

    expect(response).toEqual(expected);
  });
});
