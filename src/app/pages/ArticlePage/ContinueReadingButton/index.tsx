import { use, useEffect, MouseEvent, SetStateAction, Dispatch } from 'react';
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
  experimentProps?: {
    sendOptimizelyEvents: boolean;
    experimentName: string;
    experimentVariant: string;
  };
};

const ContinueReadingButton = ({
  showAllContent,
  setShowAllContent,
  experimentProps,
}: ContinueReadingButtonProps) => {
  const {
    translations: { continueReading = 'Continue reading' },
  } = use(ServiceContext);

  const eventTrackingData: EventTrackingData = {
    componentName: 'continue-reading-button',
    ...(experimentProps && experimentProps),
  };

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

  useEffect(() => {
    if (showAllContent) return;
    const continueReadingToggle = document.getElementById(
      'continue-reading-toggle',
    ) as HTMLInputElement | null;

    if (continueReadingToggle?.checked) {
      setShowAllContent(true);
    }
  }, [showAllContent, setShowAllContent]);

  const handleEvent = (
    event: MouseEvent<HTMLInputElement | HTMLLabelElement>,
  ) => {
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

  const handleLabelClick = (event: MouseEvent<HTMLLabelElement>) => {
    // Prevent checkbox toggling when JS is available; CSS-only handles no-JS.
    event.preventDefault();
    handleEvent(event);
  };

  const handleInputClick = (event: MouseEvent<HTMLInputElement>) => {
    if (event.detail !== 0) return;
    handleEvent(event);
  };

  // Hide button when all content is shown
  if (showAllContent) return null;

  return (
    <>
      <input
        id="continue-reading-toggle"
        type="checkbox"
        css={styles.continueReadingToggle}
        onClick={handleInputClick}
        data-testid="continue-reading-toggle"
      />
      <label
        id="continue-reading-button"
        css={styles.continueReadingButton}
        htmlFor="continue-reading-toggle"
        onClick={handleLabelClick}
        data-testid="continue-reading-button"
        {...viewRef}
      >
        <Text fontVariant="sansBold">{continueReading}</Text>
        <TriangleDown />
      </label>
    </>
  );
};

export default ContinueReadingButton;
