import urlWithPageAnchor from '.';
import onClient from '../onClient';

let onClientMockRes = true;
jest.mock('../onClient', () => jest.fn());
onClient.mockImplementation(() => onClientMockRes);

describe('urlWithPageAnchor', () => {
  beforeEach(() => {
    window.location.hash = '';
    onClientMockRes = true;

    jest.clearAllMocks();
  });

  it('should return false when no anchor', () => {
    expect(urlWithPageAnchor()).toBeFalsy();
  });

  it('should return the hash value when present', () => {
    window.location.hash = 'foobar';
    expect(urlWithPageAnchor()).toEqual('#foobar');
  });

  it('should return false when onClient returns false', () => {
    onClientMockRes = false;
    window.location.hash = 'this-should-still-return-false';

    expect(urlWithPageAnchor()).toBe(false);
  });
});
