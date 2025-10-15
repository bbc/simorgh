/** @jsx jsx */
import { use, useEffect, MouseEvent } from 'react';
import { jsx } from '@emotion/react';
import Text from '#app/components/Text';
import { TriangleDown } from '#app/components/icons';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import useViewTracker from '#app/hooks/useViewTracker';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles from './index.styles';

export type Props = {
  showAllContent: boolean;
  setShowAllContent: () => void;
  variation:
    | 'read-more-a'
    | 'read-more-b'
    | 'read-more-a-and-top-stories'
    | null;
  liteCTAShows?: boolean;
};

const ContinueReadingButton = ({
  showAllContent,
  setShowAllContent,
  variation,
  liteCTAShows,
}: Props) => {
  const eventTrackingData: EventTrackingData = {
    componentName: 'read-more-button',
    sendOptimizelyEvents: true,
    experimentName: 'newswb_ws_read_more_b',
    experimentVariant: 'read-more-b',
  };

  const viewRef = useViewTracker(eventTrackingData);
  const { onClick: clickTrackerHandler } =
    useClickTrackerHandler(eventTrackingData);

  const handleEvent = (event: MouseEvent<HTMLButtonElement>) => {
    clickTrackerHandler?.(event);
    setShowAllContent();
  };

  useEffect(() => {
    if (showAllContent) {
      const main = document.querySelector('main');
      // Get the 7th or 8th child element of the main element depending on if the liveCTA link is present
      const nthElement =
        main?.querySelectorAll<HTMLElement>(':scope > *')[liteCTAShows ? 8 : 7];

      if (nthElement) {
        // Apply the custom focus style dynamically
        nthElement.tabIndex = 0;
        nthElement.focus();
        nthElement.classList.add('continueReadingFocusedElement');
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAllContent]);

  // Hide button when all content is shown
  if (showAllContent || !variation) return null;

  const {
    translations: { continueReading = 'Continue reading' },
  } = use(ServiceContext);

  // Display variations of button based on variation
  const buttonStyle =
    variation === 'read-more-a' || variation === 'read-more-a-and-top-stories'
      ? styles.continueReadingButtonA
      : styles.continueReadingButtonB;

  return (
    <button
      css={[buttonStyle, styles.hideButtonOnDesktop]}
      type="button"
      onClick={handleEvent}
      data-testid="read-more-button"
      {...viewRef}
    >
      <Text fontVariant="sansBold">{continueReading}</Text>
      {variation === 'read-more-b' && <TriangleDown />}
    </button>
  );
};

export default ContinueReadingButton;
