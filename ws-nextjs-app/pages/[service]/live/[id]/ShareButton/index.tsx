/* eslint-disable jsx-a11y/aria-role */
import type { MouseEvent } from 'react';

import { use, useRef } from 'react';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import { ExternalSvg } from '#app/components/icons';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles from './styles';

const ShareSvg = () => (
  <ExternalSvg path="images/icons/share.svg" width="16" height="16" />
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
  const viewTracker = useViewTracker(eventTrackingData);
  const focusRef = useRef<HTMLButtonElement>(null);
  const { onClick: clickTrackerHandler } =
    useClickTrackerHandler(eventTrackingData);
  const {
    translations: {
      liveExperiencePage: { shareButtonText = 'Share' },
    },
  } = use(ServiceContext);

  const handleShare = async (event: MouseEvent<HTMLButtonElement>) => {
    if (clickTrackerHandler) clickTrackerHandler(event);
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
    <div {...viewTracker} data-e2e="share">
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
