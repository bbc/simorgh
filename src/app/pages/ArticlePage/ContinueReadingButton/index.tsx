/** @jsx jsx */
import {
  use,
  useEffect,
  useState,
  MouseEvent,
  SetStateAction,
  Dispatch,
} from 'react';
import { jsx } from '@emotion/react';
import Text from '#app/components/Text';
import { TriangleDown } from '#app/components/icons';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import useViewTracker from '#app/hooks/useViewTracker';
import { ServiceContext } from '#app/contexts/ServiceContext';
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
  const {
    translations: { continueReading = 'Continue reading' },
  } = use(ServiceContext);

  const [firstHiddenElement, setFirstHiddenElement] = useState<
    HTMLElement | undefined
  >(undefined);

  const viewRef = useViewTracker(eventTrackingData);
  const { onClick: clickTrackerHandler } =
    useClickTrackerHandler(eventTrackingData);

  useEffect(() => {
    if (showAllContent && firstHiddenElement) {
      // Apply the custom focus style dynamically
      firstHiddenElement.tabIndex = 0;
      firstHiddenElement.focus();
    }
  }, [firstHiddenElement, showAllContent]);

  const handleEvent = (event: MouseEvent<HTMLButtonElement>) => {
    clickTrackerHandler?.(event);

    const maybeKeyboardEvent = event.detail === 0;

    if (maybeKeyboardEvent) {
      const main = document.querySelector('main');
      const hiddenElement = Array.from(main?.children || []).find(
        child => getComputedStyle(child).display === 'none',
      ) as HTMLElement | undefined;

      hiddenElement?.setAttribute('data-first-hidden-element', 'true');
      setFirstHiddenElement(hiddenElement);
    }

    setShowAllContent(true);
  };

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
