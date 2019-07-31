import buildMediaRoutes, { buildMediaDataRoutes } from './index';

const mockConfigObjectA = {
  blah: ['meh'],
  foobar: ['test'],
};

const mockConfigObjectB = {
  foobar: ['serviceId1', 'serviceId2', 'serviceId3'],
};

describe('buildMediaRoutes', () => {
  it('should create an array of regexs based on the object passed in', () => {
    const expected = [
      '/:service(blah)/:serviceId(meh)/:mediaId([a-z0-9]+):amp(.amp)?',
      '/:service(foobar)/:serviceId(test)/:mediaId([a-z0-9]+):amp(.amp)?',
    ];

    expect(buildMediaRoutes(mockConfigObjectA)).toEqual(expected);
  });

  it('should allow for multiple serviceIds seperated with |', () => {
    const expected = [
      '/:service(foobar)/:serviceId(serviceId1|serviceId2|serviceId3)/:mediaId([a-z0-9]+):amp(.amp)?',
    ];

    expect(buildMediaRoutes(mockConfigObjectB)).toEqual(expected);
  });
});

describe('buildMediaDataRoutes', () => {
  it('should create an array of regexs based on the object passed in', () => {
    const expected = [
      '/:service(blah)/:serviceId(meh)/:mediaId([a-z0-9]+).json',
      '/:service(foobar)/:serviceId(test)/:mediaId([a-z0-9]+).json',
    ];

    expect(buildMediaDataRoutes(mockConfigObjectA)).toEqual(expected);
  });

  it('should allow for multiple serviceIds seperated with |', () => {
    const expected = [
      '/:service(foobar)/:serviceId(serviceId1|serviceId2|serviceId3)/:mediaId([a-z0-9]+).json',
    ];

    expect(buildMediaDataRoutes(mockConfigObjectB)).toEqual(expected);
  });
});
