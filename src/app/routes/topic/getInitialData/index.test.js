import * as fetchPageData from '#app/routes/utils/fetchPageData';
import getInitialData from '.';

const topicJSON = {
  data: {
    title: 'Donald Trump',
    summaries: [
      {
        title: 'Wetin happun for January 6 one year ago?',
        type: 'article',
        firstPublished: '2022-01-06T19:00:29.000Z',
        imageUrl: 'mock-image-url',
        link: 'mock-link',
        imageAlt: 'mock-image-alt',
        id: '54321',
      },
    ],
  },
};

describe('get initial data for topic', () => {
  const agent = { ca: 'ca', key: 'key' };
  const getAgent = jest.fn(() => agent);
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return the correct topic data', async () => {
    fetch.mockResponse(JSON.stringify(topicJSON));
    const { pageData } = await getInitialData({
      path: 'mock-topic-path',
      getAgent,
      service: 'pidgin',
    });
    expect(pageData.title).toEqual('Donald Trump');
    expect(pageData.summaries[0].title).toEqual(
      'Wetin happun for January 6 one year ago?',
    );
    expect(pageData.summaries[0].type).toEqual('article');
    expect(pageData.summaries[0].firstPublished).toEqual(
      '2022-01-06T19:00:29.000Z',
    );
    expect(pageData.summaries[0].imageUrl).toEqual('mock-image-url');
    expect(pageData.summaries[0].link).toEqual('mock-link');
    expect(pageData.summaries[0].imageAlt).toEqual('mock-image-alt');
    expect(pageData.summaries[0].id).toEqual('54321');
  });

  it('should call fetchPageData with the correct request URL', async () => {
    fetch.mockResponse(JSON.stringify(topicJSON));
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
