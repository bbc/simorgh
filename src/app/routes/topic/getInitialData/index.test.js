import assocPath from 'ramda/src/assocPath';
import * as fetchPageData from '#app/routes/utils/fetchPageData';
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
        variantTopicId: null,
      },
    ],
    activePage: 1,
    pageCount: 14,
    variantTopicId: null,
  },
};

const optHeaders = { 'ctx-service-env': 'live' };

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
    expect(pageData.scriptSwitchId).toBeNull();
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
      path: 'mock-topic-path',
      getAgent,
      service: 'pidgin',
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
      path: 'mock-topic-path',
      getAgent,
      service: 'pidgin',
    });
    expect(pageData.title).toEqual('Donald Trump');
    expect(pageData.description).toEqual('');
  });

  it('should call fetchPageData with the correct request URL', async () => {
    fetch.mockResponse(JSON.stringify(topicJSON));
    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');
    await getInitialData({
      path: 'pidgin/topics/54321',
      getAgent,
      service: 'pidgin',
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=54321&service=pidgin',
      agent,
      optHeaders,
    });
  });

  it('should call fetchPageData with the correct request URL - with variant', async () => {
    fetch.mockResponse(JSON.stringify(topicJSON));
    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');
    await getInitialData({
      path: 'serbian/cyr/topics/54321',
      getAgent,
      service: 'serbian',
      variant: 'cyr',
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=54321&service=serbian&variant=cyr',
      agent,
      optHeaders,
    });
  });

  it('should remove .amp from ID', async () => {
    fetch.mockResponse(JSON.stringify(topicJSON));
    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');
    await getInitialData({
      path: 'pidgin/topics/54321.amp',
      getAgent,
      service: 'pidgin',
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=54321&service=pidgin',
      agent,
      optHeaders,
    });
  });

  it('should remove query string from ID', async () => {
    fetch.mockResponse(JSON.stringify(topicJSON));
    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');
    await getInitialData({
      path: 'pidgin/topics/54321?foo=bar',
      getAgent,
      service: 'pidgin',
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=54321&service=pidgin',
      agent,
      optHeaders,
    });
  });

  it('should remove .amp and query string from ID', async () => {
    fetch.mockResponse(JSON.stringify(topicJSON));
    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');
    await getInitialData({
      path: 'pidgin/topics/54321.amp?foo=bar',
      getAgent,
      service: 'pidgin',
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=54321&service=pidgin',
      agent,
      optHeaders,
    });
  });

  it('should request test data when renderer_env is set to test', async () => {
    fetch.mockResponse(JSON.stringify(topicJSON));
    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');
    await getInitialData({
      path: 'pidgin/topics/54321.?renderer_env=test',
      getAgent,
      service: 'pidgin',
    });

    const testHeader = { 'ctx-service-env': 'test' };

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=54321&service=pidgin',
      agent,
      optHeaders: testHeader,
    });
  });

  it('should call fetchPageData with the page query param if provided', async () => {
    fetch.mockResponse(JSON.stringify(topicJSON));
    const fetchDataSpy = jest.spyOn(fetchPageData, 'default');
    await getInitialData({
      path: 'pidgin/topics/54321',
      getAgent,
      service: 'pidgin',
      page: 20,
    });

    expect(fetchDataSpy).toHaveBeenCalledWith({
      path: 'https://mock-bff-path/?id=54321&service=pidgin&page=20',
      agent,
      optHeaders,
    });
  });
});
