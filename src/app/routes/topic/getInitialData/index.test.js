import getInitialData from '.';

describe('get initial data for topic', () => {
  it.skip('should return our title', () => {
    const { pageData } = getInitialData();
    expect(pageData.title).toEqual('Hello world');
  });
});
