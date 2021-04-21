import { getProviderFromSource, getIdFromSource } from './sourceHelpers';

describe('sourceHelpers', () => {
  const TWITTER_SOURCE =
    'https://twitter.com/BBCNews/status/1384138850478346243?s=20';
  const UNKNOWN_SOURCE = 'https://www.youtube.com/watch?v=XWxjmToNSjQ';

  describe('getProviderFromSource', () => {
    it('should return a provider name for a valid source', () => {
      expect(getProviderFromSource(TWITTER_SOURCE)).toEqual('twitter');
    });

    it('should return "unknown" for an unknown source', () => {
      expect(getProviderFromSource(UNKNOWN_SOURCE)).toEqual('unknown');
    });
  });

  describe('getIdFromSource', () => {
    it('should return a social embed ID for a valid source', () => {
      expect(getIdFromSource(TWITTER_SOURCE)).toEqual('1384138850478346243');
    });

    it('should return an empty string for an unknown source', () => {
      expect(getIdFromSource(UNKNOWN_SOURCE)).toEqual('');
    });
  });
});
