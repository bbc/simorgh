import assocPath from 'ramda/src/assocPath';
import * as fetchPageData from '#app/routes/utils/fetchPageData';
import { TOPIC_PAGE } from '#app/routes/utils/pageTypes';
import getInitialData from '.';

process.env.BFF_PATH = 'https://mock-bff-path';

const topicJSON = {
  data: {
    title: 'Donald Trump',
    description: 'Donald Trump articles',
    curations: [
      {
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
        activePage: 1,
        pageCount: 14,
      },
    ],
    activePage: 1,
    pageCount: 14,
    metadata: {
      type: 'Topic',
      analytics: {
        name: 'pidgin.topics.c95y35941vrt.page',
        producer: 'PIDGIN',
      },
      atiAnalytics: {
        contentId: 'urn:bbc:tipo:topic:c95y35941vrt',
        contentType: 'index-category',
        pageIdentifier: 'pidgin.topics.c95y35941vrt.page',
        pageTitle: 'Donald Trump',
      },
    },
  },
};

const optHeaders = { 'ctx-service-env': 'live' };

const agent = { ca: 'ca', key: 'key' };

const mockGetAgent = () => Promise.resolve(agent);

jest.mock('../../../../server/utilities/getAgent', () =>
  jest.fn(() => Promise.resolve(agent)),
);

describe('get initial data for topic', () => {
  const originalApplicationEnvironment = process.env.SIMORGH_APP_ENV;

  beforeEach(() => {
    process.env.SIMORGH_APP_ENV = 'live';
  });

  afterEach(() => {
    jest.clearAllMocks();
    process.env.SIMORGH_APP_ENV = originalApplicationEnvironment;
  });

  it('should return the correct topic data', async () => {
    fetch.mockResponse(JSON.stringify(topicJSON));
    const { pageData } = await getInitialData({
      path: 'pidgin/topics/c0000000000t',
      service: 'pidgin',
      getAgent: mockGetAgent,
    });
    const { curations } = pageData;
    expect(pageData.title).toEqual('Donald Trump');
    expect(pageData.description).toEqual('Donald Trump articles');
    expect(curations[0].summaries[0].title).toEqual(
      'Wetin happun for January 6 one year ago?',
    );
    expect(curations[0].summaries[0].type).toEqual('article');
    expect(curations[0].summaries[0].firstPublished).toEqual(
      '2022-01-06T19:00:29.000Z',
    );
    expect(curations[0].summaries[0].imageUrl).toEqual('mock-image-url');
    expect(curations[0].summaries[0].link).toEqual('mock-link');
    expect(curations[0].summaries[0].imageAlt).toEqual('mock-image-alt');
    expect(curations[0].summaries[0].id).toEqual('54321');
    expect(pageData.activePage).toEqual(1);
    expect(pageData.pageCount).toEqual(14);
  });

  it('should return imageData as null if none is provided', async () => {
    const topicJSONWithoutDescription = assocPath(
      ['data', 'description'],
      '',
      topicJSON,
    );
    fetch.mockResponse(JSON.stringify(topicJSONWithoutDescription));
    const { pageData } = await getInitialData({
      path: 'pidgin/topics/c0000000000t',
      service: 'pidgin',
      getAgent: mockGetAgent,
    });
    expect(pageData.title).toEqual('Donald Trump');
    expect(pageData.imageData).toEqual(null);
  });

  it('should return description as blank string if none is provided', async () => {
    const topicJSONWithoutDescription = assocPath(
      ['data', 'description'],
      '',
      topicJSON,
    );
    fetch.mockResponse(JSON.stringify(topicJSONWithoutDescription));
    const { pageData } = await getInitialData({
      path: 'pidgin/topics/c0000000000t',
      service: 'pidgin',
      getAgent: mockGetAgent,
    });
    expect(pageData.title).toEqual('Donald Trump');
    expect(pageData.description).toEqual('');
  });

  it('should call fetchPageData with the correct request URL', async () => {
    fetch.mockResponse(JSON.stringify(topicJSON));
    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');
    await getInitialData({
      path: 'pidgin/topics/c0000000000t',
      service: 'pidgin',
      getAgent: mockGetAgent,
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=c0000000000t&service=pidgin&pageType=topic&serviceEnv=live',
      agent,
      optHeaders,
      pageType: TOPIC_PAGE,
    });
  });

  it('should call fetchPageData with the correct request URL - with variant', async () => {
    fetch.mockResponse(JSON.stringify(topicJSON));
    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');
    await getInitialData({
      path: 'serbian/cyr/topics/c0000000000t',
      service: 'serbian',
      variant: 'cyr',
      getAgent: mockGetAgent,
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=c0000000000t&service=serbian&pageType=topic&variant=cyr&serviceEnv=live',
      agent,
      optHeaders,
      pageType: TOPIC_PAGE,
    });
  });

  it('should remove .amp from ID', async () => {
    fetch.mockResponse(JSON.stringify(topicJSON));
    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');
    await getInitialData({
      path: 'pidgin/topics/c0000000000t.amp',
      service: 'pidgin',
      getAgent: mockGetAgent,
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=c0000000000t&service=pidgin&pageType=topic&serviceEnv=live',
      agent,
      optHeaders,
      pageType: TOPIC_PAGE,
    });
  });

  it('should remove query string from ID', async () => {
    fetch.mockResponse(JSON.stringify(topicJSON));
    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');
    await getInitialData({
      path: 'pidgin/topics/c0000000000t?foo=bar',
      service: 'pidgin',
      getAgent: mockGetAgent,
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=c0000000000t&service=pidgin&pageType=topic&serviceEnv=live',
      agent,
      optHeaders,
      pageType: TOPIC_PAGE,
    });
  });

  it('should remove .amp and query string from ID', async () => {
    fetch.mockResponse(JSON.stringify(topicJSON));
    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');
    await getInitialData({
      path: 'pidgin/topics/c0000000000t.amp?foo=bar',
      service: 'pidgin',
      getAgent: mockGetAgent,
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=c0000000000t&service=pidgin&pageType=topic&serviceEnv=live',
      agent,
      optHeaders,
      pageType: TOPIC_PAGE,
    });
  });

  it('should request local data on local environment', async () => {
    process.env.SIMORGH_APP_ENV = 'local';
    fetch.mockResponse(JSON.stringify(topicJSON));
    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');
    await getInitialData({
      path: 'pidgin/topics/c0000000000t',
      service: 'pidgin',
      getAgent: mockGetAgent,
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'http://localhost/pidgin/topics/c0000000000t',
      pageType: TOPIC_PAGE,
      timeout: 60000,
    });
  });

  it('should request test data when renderer_env is set to test', async () => {
    fetch.mockResponse(JSON.stringify(topicJSON));
    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');
    await getInitialData({
      path: 'pidgin/topics/c0000000000t?renderer_env=test',
      service: 'pidgin',
      getAgent: mockGetAgent,
    });

    const testHeader = { 'ctx-service-env': 'test' };

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=c0000000000t&service=pidgin&pageType=topic&serviceEnv=test',
      agent,
      optHeaders: testHeader,
      pageType: TOPIC_PAGE,
    });
  });

  it('should request live data when renderer_env is set to live', async () => {
    process.env.SIMORGH_APP_ENV = 'test';
    fetch.mockResponse(JSON.stringify(topicJSON));
    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');
    await getInitialData({
      path: 'pidgin/topics/c0000000000t?renderer_env=live',
      service: 'pidgin',
      getAgent: mockGetAgent,
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=c0000000000t&service=pidgin&pageType=topic&serviceEnv=live',
      agent,
      optHeaders,
      pageType: TOPIC_PAGE,
    });
  });

  it('should call fetchPageData with the page query param if provided', async () => {
    fetch.mockResponse(JSON.stringify(topicJSON));
    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');
    await getInitialData({
      path: 'pidgin/topics/c0000000000t',
      service: 'pidgin',
      page: 20,
      getAgent: mockGetAgent,
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=c0000000000t&service=pidgin&pageType=topic&page=20&serviceEnv=live',
      agent,
      optHeaders,
      pageType: TOPIC_PAGE,
    });
  });

  it('should return type and metadata containing atiAnalytics and analytics from the BFF response', async () => {
    fetch.mockResponse(JSON.stringify(topicJSON));

    await expect(
      getInitialData({
        path: 'pidgin/topics/c0000000000t',
        service: 'pidgin',
        page: 20,
        getAgent: mockGetAgent,
      }),
    ).resolves.toHaveProperty('pageData.metadata', {
      type: 'Topic',
      analytics: {
        name: 'pidgin.topics.c95y35941vrt.page',
        producer: 'PIDGIN',
      },
      atiAnalytics: {
        contentId: 'urn:bbc:tipo:topic:c95y35941vrt',
        contentType: 'index-category',
        pageIdentifier: 'pidgin.topics.c95y35941vrt.page',
        pageTitle: 'Donald Trump',
      },
    });
  });
});
