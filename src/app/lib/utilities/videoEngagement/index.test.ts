import {
  VIDEO_ENGAGEMENT_KEY,
  hasVideoEngagement,
  markVideoEngagement,
} from '.';

describe('videoEngagement utilities', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  describe('hasVideoEngagement', () => {
    it('returns false by default when flag is not set', () => {
      expect(hasVideoEngagement()).toBe(false);
    });

    it('returns true when flag is set to "true"', () => {
      localStorage.setItem(VIDEO_ENGAGEMENT_KEY, 'true');
      expect(hasVideoEngagement()).toBe(true);
    });

    it('returns false when flag is set to a different value', () => {
      localStorage.setItem(VIDEO_ENGAGEMENT_KEY, 'false');
      expect(hasVideoEngagement()).toBe(false);
    });

    it('returns false when localStorage.getItem throws an error', () => {
      jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('Storage access denied');
      });

      expect(hasVideoEngagement()).toBe(false);
    });
  });

  describe('markVideoEngagement', () => {
    it('sets the flag to "true" when not already set', () => {
      markVideoEngagement();
      expect(localStorage.getItem(VIDEO_ENGAGEMENT_KEY)).toBe('true');
    });

    it('does not overwrite the flag if already set', () => {
      localStorage.setItem(VIDEO_ENGAGEMENT_KEY, 'true');
      markVideoEngagement();
      expect(localStorage.getItem(VIDEO_ENGAGEMENT_KEY)).toBe('true');
    });

    it('sets the flag even if it was previously set to a different value', () => {
      localStorage.setItem(VIDEO_ENGAGEMENT_KEY, 'false');
      markVideoEngagement();
      expect(localStorage.getItem(VIDEO_ENGAGEMENT_KEY)).toBe('true');
    });

    it('swallows errors when localStorage.setItem throws', () => {
      jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('Storage full');
      });

      expect(() => markVideoEngagement()).not.toThrow();
    });

    it('swallows errors when localStorage.getItem throws during the hasVideoEngagement check', () => {
      jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('Storage access denied');
      });

      expect(() => markVideoEngagement()).not.toThrow();
    });
  });

  describe('VIDEO_ENGAGEMENT_KEY', () => {
    it('exports the correct key constant', () => {
      expect(VIDEO_ENGAGEMENT_KEY).toBe('ws_video_engagement');
    });
  });
});
