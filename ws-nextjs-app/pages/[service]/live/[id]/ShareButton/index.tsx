/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/button-has-type */
/** @jsx jsx */
import { useRef } from 'react';
import { jsx } from '@emotion/react';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import styles from './styles';

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
      console.log(shareUrl);
      await navigator.share({
        url: shareUrl,
        text: headline,
        title: headline,
      });

      console.log('Successful share');
    } catch (error) {
      console.log('Error sharing', error);
    }

    setTimeout(() => {
      focusRef.current?.focus();
      console.log('FOCUS IS NOW ON ', focusRef.current);
    }, 0);
  };

  return (
    <div ref={viewRef}>
      <button ref={focusRef} onClick={handleShare} css={styles}>
        Share<VisuallyHiddenText> ,{headline}</VisuallyHiddenText>
      </button>
    </div>
  );
};

export default ShareButton;
