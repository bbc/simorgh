import getInitialData from '.';
import idxPageJson from '#data/persian/afghanistan/index.json';

fetch.mockResponse(JSON.stringify(idxPageJson));

describe('Get intial data from IDX page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return essential data for an IDX page to render', async () => {
    const { pageData } = await getInitialData({
      path: 'mock-idx-page',
    });

    expect(pageData.metadata.type).toEqual('IDX');
    expect(pageData.content.groups.length).toBeGreaterThan(1);
  });
});
