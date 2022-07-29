import { getProviderFromSource, getIdFromSource } from './sourceHelpers';

describe('sourceHelpers', () => {
  const TWITTER_SOURCE =
    'https://twitter.com/BBCNews/status/1384138850478346243?s=20';
  const INSTAGRAM_SOURCE = 'https://www.instagram.com/p/CZ4ght5sIR3';
  const YOUTUBE_SOURCE = 'https://www.youtube.com/watch?v=1e05_rwHvOM';
  const UNKNOWN_SOURCE = 'https://www.randomSource.com/watch?v=XWxjmToNSjQ';

  describe('getProviderFromSource', () => {
    it('should return a provider name for a valid source', () => {
      expect(getProviderFromSource(TWITTER_SOURCE)).toEqual('twitter');
    });

    it('should return "unknown" for an unknown source', () => {
      expect(getProviderFromSource(UNKNOWN_SOURCE)).toEqual('unknown');
    });
  });

  describe('getIdFromSource', () => {
    it('should return a social embed ID for a valid Twitter source', () => {
      expect(getIdFromSource(TWITTER_SOURCE)).toEqual('1384138850478346243');
    });

    it('should return a social embed ID for a valid Instagram source', () => {
      expect(getIdFromSource(INSTAGRAM_SOURCE)).toEqual('CZ4ght5sIR3');
    });

    it('should return a social embed ID for a valid Youtube source', () => {
      expect(getIdFromSource(YOUTUBE_SOURCE)).toEqual('1e05_rwHvOM');
    });

    it('should return an empty string for an unknown or invalid source', () => {
      expect(getIdFromSource(UNKNOWN_SOURCE)).toEqual('');
      expect(getIdFromSource('https://twitter.com/BBCNews')).toEqual('');
    });
  });
});
