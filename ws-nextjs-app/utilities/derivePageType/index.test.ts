import { LIVE_PAGE, UGC_PAGE } from '#app/routes/utils/pageTypes';
import derivePageType from '.';

describe('derivePageType', () => {
  it("should return UGC_PAGE if pathname includes 'send'", () => {
    const pathname = '/burmese/send/xxxxxxxxx';
    const result = derivePageType(pathname);
    expect(result).toEqual(UGC_PAGE);
  });

  it("should return LIVE_PAGE if pathname includes 'live'", () => {
    const pathname = '/burmese/live/xxxxxxxxx';
    const result = derivePageType(pathname);
    expect(result).toEqual(LIVE_PAGE);
  });

  it('should return Unknown if pathname does not include live or send', () => {
    const pathname = '/burmese/xxxxxxxxx';
    const result = derivePageType(pathname);
    expect(result).toEqual('Unknown');
  });

  it('should strip our query params from the pathname', () => {
    const pathname = '/burmese/live/xxxxxxxxx?foo=bar';
    const result = derivePageType(pathname);
    expect(result).toEqual(LIVE_PAGE);
  });
});
