import getInitialData from '.';

describe('get initial data for topic', () => {
  it('should return our title', () => {
    const { pageData } = getInitialData();
    expect(pageData.title).toEqual('hello world');
  });
});
