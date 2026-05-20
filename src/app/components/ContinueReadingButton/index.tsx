import {
  type Dispatch,
  type MouseEvent,
  type SetStateAction,
  use,
  useEffect,
} from 'react';

import { TriangleDown } from '#app/components/icons';
import Text from '#app/components/Text';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';
import type { EventTrackingData } from '#app/lib/analyticsUtils/types';
import type { ComponentExperimentProps } from '#app/models/types/global';
import styles from './index.styles';

export type ContinueReadingButtonProps = {
  showAllContent: boolean;
  setShowAllContent: Dispatch<SetStateAction<boolean>>;
  experimentProps?: ComponentExperimentProps;
  className?: string;
};
const ContinueReadingButton = ({
  showAllContent,
  setShowAllContent,
  experimentProps,
  className,
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

  // Hide button when all content is shown
  if (showAllContent) return null;

  return (
    <button
      id="continue-reading-button"
      css={styles.continueReadingButton}
      type="button"
      onClick={handleEvent}
      className={className}
      data-testid="continue-reading-button"
      {...viewRef}
    >
      <Text fontVariant="sansBold">{continueReading}</Text>
      <TriangleDown />
    </button>
  );
};

export default ContinueReadingButton;
