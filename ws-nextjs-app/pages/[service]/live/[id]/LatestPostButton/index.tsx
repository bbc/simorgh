import { RefObject, use, useRef, useEffect, useState } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import useCustomEventTracker from '#app/hooks/useCustomEventTracker';
import styles from './styles';

const TEN_SECONDS = 10 * 1000;

const RefreshSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <path d="M31.1 2.5H1v2.8h30.1zM14.3 13.3 31 29.5v-6.7L16 8.1.9 22.8v6.7l16.8-16.2z" />
  </svg>
);

interface LatestPostButtonProps {
  isFirstPostVisible: boolean;
  hasPendingUpdate: boolean;
  streamRef: RefObject<HTMLDivElement> | null;
  pageId: string;
}

const LatestPostButton = ({
  isFirstPostVisible,
  hasPendingUpdate,
  streamRef,
  pageId,
}: LatestPostButtonProps) => {
  const {
    translations: {
      liveExperiencePage: {
        refreshButtonText = 'Latest Post',
        visuallyHiddenButtonText = 'New post available',
      },
    },
  } = use(ServiceContext);

  const [showButton, setShowButton] = useState(false);
  const buttonShownTime = useRef<number | null>(null);

  const trackButtonShown = useCustomEventTracker({
    eventName: 'live_refresh_button_shown',
  });

  const trackButtonClicked = useCustomEventTracker({
    eventName: 'live_refresh_button_clicked',
  });

  const handleClick = async () => {
    const hasReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (buttonShownTime.current != null) {
      const timeShown = Date.now() - buttonShownTime.current;
      trackButtonShown(
        JSON.stringify({
          page_id: pageId,
          time_shown: timeShown,
        }),
      );
      buttonShownTime.current = null;
    }

    if (streamRef) {
      const streamContainer = streamRef.current;
      streamContainer.scrollIntoView({
        behavior: hasReducedMotion ? 'auto' : 'smooth',
      });
    }

    trackButtonClicked(
      JSON.stringify({
        page_id: pageId,
      }),
    );
  };

  useEffect(() => {
    let timeoutId;
    const shouldShowButton = !isFirstPostVisible && hasPendingUpdate;
    if (shouldShowButton) {
      setShowButton(shouldShowButton);
      buttonShownTime.current = Date.now();

      timeoutId = setTimeout(() => {
        setShowButton(false);
        if (buttonShownTime.current != null) {
          trackButtonShown(
            JSON.stringify({
              page_id: pageId,
            }),
          );
          buttonShownTime.current = null;
        }
      }, TEN_SECONDS);
    } else {
      setShowButton(shouldShowButton);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isFirstPostVisible, hasPendingUpdate, trackButtonShown, pageId]);

  return (
    <div css={styles.container}>
      <VisuallyHiddenText aria-live="polite">
        {showButton && <span>{visuallyHiddenButtonText}</span>}
      </VisuallyHiddenText>
      {showButton && (
        <button
          data-testid="latest-post-button"
          type="button"
          onClick={handleClick}
          css={styles.button}
          tabIndex={showButton ? 0 : -1}
        >
          <RefreshSvg />
          <span>{refreshButtonText}</span>
        </button>
      )}
    </div>
  );
};

export default LatestPostButton;
