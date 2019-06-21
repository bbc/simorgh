import getLocator from './locator';

describe('getLocator', () => {
  it('should return the locator given a valid path', () => {
    const path = '/cpsprodpb/FFC1/production/_107437456_177a9008.jpg';
    const locator = getLocator(path);

    expect(locator).toEqual('FFC1/production/_107437456_177a9008.jpg');
  });

  it('should return null when path is invalid', () => {
    expect(getLocator()).toBeNull();
    expect(getLocator('path')).toBeNull();
  });
});
