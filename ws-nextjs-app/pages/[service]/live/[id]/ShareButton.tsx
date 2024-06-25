/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/button-has-type */
import React, { useRef } from 'react';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';

const ShareButton = ({
  contentId,
  eventTrackingData,
  headline,
}: {
  contentId: string;
  eventTrackingData: {
    componentName: string;
  };
  headline: string;
}) => {
  const viewRef = useViewTracker(eventTrackingData);
  const focusRef = useRef<HTMLButtonElement>(null);
  const clickTrackerHandler = useClickTrackerHandler(eventTrackingData);

  const handleShare = async (event: any) => {
    clickTrackerHandler(event);
    try {
      const shareUrl = `${window.location.href}#${contentId}`;
      await navigator.share({
        url: shareUrl,
      });
      if (focusRef.current) {
        focusRef.current.focus();
      }
      console.log('Successful share');
    } catch (error) {
      console.log('Error sharing', error);
    }
  };

  return (
    /* @ts-ignore*/
    <div ref={viewRef}>
      <button ref={focusRef} onClick={handleShare}>
        Click to share {headline}
      </button>
    </div>
  );
};

export default ShareButton;
