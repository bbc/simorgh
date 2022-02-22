import getInitialData from '.';

const topicJSON = {
  data: {
    title: 'Donald Trump',
  },
};

describe('get initial data for topic', () => {
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

  it.skip('should append the service and id to the BFF_PATH as a query string and return the topic - using a topic without a variant', () => {});

  it.skip('should append the service, id and optional service variant to the BFF_PATH as a query string and return the topic - using a topic with a service variant', () => {});
});

describe('get error codes for initial data request responses ', () => {
  it.skip('should throw an error and status code - code 500', () => {});

  it.skip('should throw an error and status code - code 404', () => {});

  it.skip('should throw an error and status code - code 400', () => {});

  it.skip('should throw an error when the page data is undefined', async () => {
    const { pageData } = await getInitialData({
      getAgent,
      service: 'pigeon',
    });
    expect(pageData).toEqual(undefined);
  });
});
