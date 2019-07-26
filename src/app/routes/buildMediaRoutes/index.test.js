import buildMediaRoutes from './index';

describe('buildMediaRoutes', () => {
  it('should create an array of regexs based on the object passed in', () => {
    const mockConfigObject = {
      blah: ['meh'],
      foobar: ['test'],
    };

    const expected = [
      '/:service(blah)/:serviceId(meh)/:mediaId([a-z0-9]+):amp(.amp)?',
      '/:service(foobar)/:serviceId(test)/:mediaId([a-z0-9]+):amp(.amp)?',
    ];

    expect(buildMediaRoutes(mockConfigObject)).toEqual(expected);
  });

  it('should allow for multiple serviceIds seperated with |', () => {
    const mockConfigObject = {
      foobar: ['serviceId1', 'serviceId2', 'serviceId3'],
    };

    const expected = [
      '/:service(foobar)/:serviceId(serviceId1|serviceId2|serviceId3)/:mediaId([a-z0-9]+):amp(.amp)?',
    ];

    expect(buildMediaRoutes(mockConfigObject)).toEqual(expected);
  });
});
