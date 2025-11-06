/** @jsx jsx */
import { use, useEffect, MouseEvent, SetStateAction, Dispatch } from 'react';
import { jsx } from '@emotion/react';
import Text from '#app/components/Text';
import { TriangleDown } from '#app/components/icons';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import useViewTracker from '#app/hooks/useViewTracker';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useOperaMiniDetection from '#app/hooks/useOperaMiniDetection';
import styles from './index.styles';

export type ContinueReadingButtonProps = {
  showAllContent: boolean;
  setShowAllContent: Dispatch<SetStateAction<boolean>>;
};

const eventTrackingData: EventTrackingData = {
  componentName: 'continue-reading-button',
};

const ContinueReadingButton = ({
  showAllContent,
  setShowAllContent,
}: ContinueReadingButtonProps) => {
  const isOperaMini = useOperaMiniDetection();

  const {
    translations: { continueReading = 'Continue reading' },
  } = use(ServiceContext);

  const viewRef = useViewTracker(eventTrackingData);
  const { onClick: clickTrackerHandler } =
    useClickTrackerHandler(eventTrackingData);

  useEffect(() => {
    if (showAllContent) {
      const firstHiddenElementSibling = document.querySelector(
        '[data-first-hidden-element="true"]',
      ) as HTMLElement | null;

      if (firstHiddenElementSibling) {
        firstHiddenElementSibling.tabIndex = 0;
        firstHiddenElementSibling.focus();
      }
    }
  }, [showAllContent]);

  const handleEvent = (event: MouseEvent<HTMLButtonElement>) => {
    clickTrackerHandler?.(event);

    const maybeKeyboardEvent = event.detail === 0;

    if (maybeKeyboardEvent) {
      const button = document.getElementById('continue-reading-button');

      const firstHiddenElementSibling = button?.nextElementSibling;

      firstHiddenElementSibling?.setAttribute(
        'data-first-hidden-element',
        'true',
      );
    }

    setShowAllContent(true);
  };

  // Hide button for Opera Mini users
  if (isOperaMini) return null;

  // Hide button when all content is shown
  if (showAllContent) return null;

  return (
    <button
      id="continue-reading-button"
      css={styles.continueReadingButton}
      type="button"
      onClick={handleEvent}
      data-testid="continue-reading-button"
      {...viewRef}
    >
      <Text fontVariant="sansBold">{continueReading}</Text>
      <TriangleDown />
    </button>
  );
};

export default ContinueReadingButton;
