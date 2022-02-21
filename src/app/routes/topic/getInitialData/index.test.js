import getInitialData from '.';

describe('get initial data for topic', () => {
  it.skip('should return our topic title', () => {
    const { pageData } = getInitialData();
    expect(pageData.title).toEqual('Hello world');
  });

  it.skip('should return title, type, firstPublished, link, imageUrl and id from a summary', () => {});

  it.skip('should throw an error if the topic id is invalid', () => {});

  it.skip('should append the service and id to the BFF_PATH as a query string and return the topic - using a topic without a variant', () => {});

  it.skip('should append the service, id and optional service variant to the BFF_PATH as a query string and return the topic - using a topic with a service variant', () => {});
});
