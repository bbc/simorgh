import { getProviderFromSource, getIdFromSource } from './sourceHelpers';

describe('sourceHelpers', () => {
  const TWITTER_SOURCE =
    'https://twitter.com/BBCNews/status/1384138850478346243?s=20';
  const INSTAGRAM_SOURCE = 'https://www.instagram.com/p/CZ4ght5sIR3';
  const INSTAGRAM_SOURCE_UNDERSCORED =
    'https://www.instagram.com/p/CZ4ght5sIR3_';
  const YOUTUBE_SOURCE = 'https://www.youtube.com/watch?v=1e05_rwHvOM';
  const TIKTOK_SOURCE =
    'https://www.tiktok.com/@cuppymusic/video/7086167423639997701';
  const FACEBOOK_POST_SOURCE =
    'https://www.facebook.com/RickAstley/posts/545713756920775';
  const FACEBOOK_VIDEO_SOURCE =
    'https://www.facebook.com/RickAstley/videos/1378590239249667';
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

    it('should return a social embed ID for a valid Instagram source that ends with an underscore', () => {
      expect(getIdFromSource(INSTAGRAM_SOURCE_UNDERSCORED)).toEqual(
        'CZ4ght5sIR3_',
      );
    });

    it('should return a social embed ID for a valid Youtube source', () => {
      expect(getIdFromSource(YOUTUBE_SOURCE)).toEqual('1e05_rwHvOM');
    });

    it('should return a social embed ID for a valid TikTok source', () => {
      expect(getIdFromSource(TIKTOK_SOURCE)).toEqual('7086167423639997701');
    });

    it('should return a social embed ID for a valid Facebook Post source', () => {
      expect(getIdFromSource(FACEBOOK_POST_SOURCE)).toEqual('545713756920775');
    });

    it('should return a social embed ID for a valid Facebook Video source', () => {
      expect(getIdFromSource(FACEBOOK_VIDEO_SOURCE)).toEqual(
        '1378590239249667',
      );
    });

    it('should return an empty string for an unknown or invalid source', () => {
      expect(getIdFromSource(UNKNOWN_SOURCE)).toEqual('');
      expect(getIdFromSource('https://twitter.com/BBCNews')).toEqual('');
    });
  });
});
