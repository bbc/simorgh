/* eslint-disable jsx-a11y/aria-role */
/** @jsx jsx */
import { useContext, useRef } from 'react';
import { jsx } from '@emotion/react';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles from './styles';

const ShareSvg = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M3.8999 8.50001L12.6499 3.50001L12.0499 2.35001L3.2999 7.50001L3.8999 8.50001ZM3.2999 8.50001L12.0499 13.65L12.6499 12.5L3.8999 7.50001L3.2999 8.50001ZM6.0999 8.00001C6.0999 6.65001 4.9999 5.50001 3.5999 5.50001C2.2499 5.50001 1.1499 6.60001 1.1499 8.00001C1.1499 9.35001 2.2499 10.45 3.5999 10.45C4.9999 10.45 6.0999 9.35001 6.0999 8.00001ZM14.8499 2.95001C14.8499 1.60001 13.7499 0.450012 12.3499 0.450012C10.9999 0.450012 9.8999 1.55001 9.8999 2.95001C9.8999 4.30001 10.9999 5.40001 12.3499 5.40001C13.7499 5.40001 14.8499 4.30001 14.8499 2.95001ZM14.8499 13.05C14.8499 11.7 13.7499 10.55 12.3499 10.55C10.9999 10.55 9.8999 11.65 9.8999 13.05C9.8999 14.4 10.9999 15.5 12.3499 15.5C13.7499 15.55 14.8499 14.4 14.8499 13.05Z"
      fill="black"
    />
  </svg>
);

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
  const {
    translations: {
      liveExperiencePage: { shareButtonText = 'Share' },
    },
  } = useContext(ServiceContext);

  const handleShare = async (event: React.MouseEvent<HTMLButtonElement>) => {
    clickTrackerHandler(event);
    try {
      const currentUrlNoHash = new URL(window.location.href.split('#')[0]);

      const newParams = new URLSearchParams([
        ...Array.from(currentUrlNoHash.searchParams.entries()),
        ...Object.entries({ post: contentId }),
      ]).toString();

      const shareUrl = `${currentUrlNoHash.origin}${currentUrlNoHash.pathname}?${newParams}#${contentId}`;
      // await navigator.clipboard.writeText(shareUrl);
      await navigator.share({
        url: shareUrl,
        title: headline,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error sharing', error);
    }

    setTimeout(() => focusRef.current?.focus(), 0);
  };

  return (
    // @ts-expect-error TODO need help fixing this!
    <div {...viewRef} data-e2e="share">
      <button
        type="button"
        ref={focusRef}
        onClick={handleShare}
        css={styles.button}
      >
        <ShareSvg />
        <span role="text">
          <span>{shareButtonText}</span>
          <VisuallyHiddenText>, {headline}</VisuallyHiddenText>
        </span>
      </button>
    </div>
  );
};

export default ShareButton;
