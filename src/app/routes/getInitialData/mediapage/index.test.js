import getMediaPageInitialData from '.';

const mockData = { service: 'amharic', status: 200 };

describe('getMediaPageInitialData', () => {
  it('returns a promise', async () => {
    expect(await getMediaPageInitialData({ service: 'amharic' })).toEqual(
      mockData,
    );
  });
});
