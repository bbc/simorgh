require('./mocks/services');
const { expectedUrls } = require('./mocks/fixtures');
const getUrls = require('./getUrls');

describe('getUrls', () => {
  it('should get the correct urls', () => {
    const urls = getUrls();
    expect(urls).toEqual(expectedUrls);
  });
});
