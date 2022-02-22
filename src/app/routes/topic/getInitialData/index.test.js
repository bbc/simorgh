import * as fetchPageData from '#app/routes/utils/fetchPageData';
import getInitialData from '.';

const topicJSON = {
  data: {
    title: 'Donald Trump',
  },
};

describe('get initial data for topic', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return our topic title', async () => {
    fetch.mockResponse(JSON.stringify(topicJSON));
    const getAgent = jest.fn();
    const { pageData } = await getInitialData({
      path: 'mock-topic-path',
      getAgent,
      service: 'pidgin',
    });
    expect(pageData.title).toEqual('Donald Trump');
  });

  it.skip('should return title, type, firstPublished, link, imageUrl and id from a summary', () => {});

  it('should call fetchPageData with the correct request URL', async () => {
    fetch.mockResponse(JSON.stringify(topicJSON));
    const agent = { ca: 'ca', key: 'key' };
    const getAgent = jest.fn(() => agent);
    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');
    const { pageData } = await getInitialData({
      path: 'pidgin/topics/54321',
      getAgent,
      service: 'pidgin',
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'mock-bff-path?id=54321&service=pidgin',
      agent,
    });
  });

  it('should call fetchPageData with the correct request URL - with variant', async () => {
    fetch.mockResponse(JSON.stringify(topicJSON));
    const agent = { ca: 'ca', key: 'key' };
    const getAgent = jest.fn(() => agent);
    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');
    const { pageData } = await getInitialData({
      path: 'serbian/cyr/topics/54321',
      getAgent,
      service: 'serbian',
      variant: 'sr-cyrl',
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'mock-bff-path?id=54321&service=serbian&variant=sr-cyrl',
      agent,
    });
  });
});
