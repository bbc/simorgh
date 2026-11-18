export const VIDEO_ENGAGEMENT_KEY = 'ws_video_engagement';

export const hasVideoEngagement = (): boolean => {
  try {
    return window.localStorage.getItem(VIDEO_ENGAGEMENT_KEY) === 'true';
  } catch {
    return false;
  }
};

// Records that this browser has watched a video or clicked a video promo.
export const markVideoEngagement = (): void => {
  try {
    if (!hasVideoEngagement()) {
      window.localStorage.setItem(VIDEO_ENGAGEMENT_KEY, 'true');
    }
  } catch {
    // Storage unavailable (private mode, blocked): treat as no engagement.
  }
};
