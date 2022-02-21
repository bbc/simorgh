import getInitialData from '.';
import getAgent from '../../../../server/utilities/getAgent';

describe('get initial data for topic', () => {
  it('should return our topic title', async () => {
    const { pageData } = await getInitialData({
      agent: getAgent(),
      service: 'pidgin',
    });
    expect(pageData)
      .toEqual('Hello world')
      .catch(e => expect(e).toMatch('error'));
  });

  it.skip('should return title, type, firstPublished, link, imageUrl and id from a summary', () => {});

  it.skip('should append the service and id to the BFF_PATH as a query string and return the topic - using a topic without a variant', () => {});

  it.skip('should append the service, id and optional service variant to the BFF_PATH as a query string and return the topic - using a topic with a service variant', () => {});
});

describe('get error codes for initial data request responses ', () => {
  it.skip('should throw an error and status code - code 500', () => {});

  it.skip('should throw an error and status code - code 404', () => {});

  it.skip('should throw an error and status code - code 400', () => {});

  it.skip('should throw an error when the page data is undefined', () => {});
});
