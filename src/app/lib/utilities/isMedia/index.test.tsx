import isMedia, { MEDIA_TYPES, MediaType } from '.';

describe('isMedia', () => {
  it('should return true for valid media types', () => {
    Object.values(MEDIA_TYPES).forEach(mediaType => {
      expect(isMedia(mediaType)).toBe(true);
    });
  });

  it('should return false for non-media types', () => {
    const nonMediaTypes = ['article', 'story', 'text', 'blog', 'news'];

    nonMediaTypes.forEach(type => {
      expect(isMedia(type)).toBe(false);
    });
  });

  it('should return false for non valid input', () => {
    expect(isMedia('')).toBe(false);
    expect(isMedia(undefined as unknown as MediaType)).toBe(false);
    expect(isMedia(null as unknown as MediaType)).toBe(false);
  });
});
