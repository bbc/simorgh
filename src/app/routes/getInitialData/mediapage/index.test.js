import getMediaPageInitialData from '.';

describe('getMediaPageInitialData', () => {
  it('returns a promise', async () => {
    expect(getMediaPageInitialData({ service: 'amharic' }).then).toBeDefined();
  });
});
